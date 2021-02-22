const payWithXinfinExtension = async (fulfillment_id, to_address, vm, modal) => {

  const amount = vm.fulfillment_context.amount;
  const token_name = vm.bounty.token_name;

  // 1. init rsk provider
  const xinfinHost = "https://rpc.apothem.network";
  // const xinfinHost = "https://rpc.xinfin.network";
  const xinfinClient = new Web3();
  xinfinClient.setProvider(
    new xinfinClient.providers.HttpProvider(xinfinHost)
  );

  // Prompt user to unlock wallet if ethereum.selectedAddress is not present
  if (!provider) {
    try {
      console.log(ethereum.selectedAddress);
    } catch (e) {
      modal.closeModal();
      _alert({ message: 'Please download or enable XinPay Wallet extension' }, 'error');
      return;
    }
    
    if (!ethereum.selectedAddress) {
      modal.closeModal();
      return onConnect().then(() => {
        modal.openModal();
      });
    }
  }

  // 2. construct + sign txn via xinpay
  let txArgs;

  if (token_name == 'XDC') {

    balanceInWei = await xinfinClient.eth.getBalance(ethereum.selectedAddress);

    rbtcBalance = xinfinClient.utils.fromWei(balanceInWei, 'ether');
  
    if (Number(rbtcBalance) < amount) {
      _alert({ message: `Insufficent balance in address ${ethereum.selectedAddress}` }, 'error');
      return;
    }

    txArgs = {
      to: to_address.toLowerCase(),
      from: ethereum.selectedAddress,
      value: xinfinClient.utils.toHex(xinfinClient.utils.toWei(String(amount))),
      gasPrice: xinfinClient.utils.toHex(await xinfinClient.eth.getGasPrice()),
      gas: xinfinClient.utils.toHex(318730),
      gasLimit: xinfinClient.utils.toHex(318730)
    };

  } else {

    tokenContract = new xinfinClient.eth.Contract(token_abi, vm.bounty.token_address);

    balance = tokenContract.methods.balanceOf(
      ethereum.selectedAddress).call({from: ethereum.selectedAddress});

    amountInWei  = amount * 1.0 * Math.pow(10, vm.decimals);

    if (Number(balance) < amountInWei) {
      _alert({ message: `Insufficent balance in address ${ethereum.selectedAddress}` }, 'error');
      return;
    }

    amountAsString = new xinfinClient.utils.BN(BigInt(amountInWei)).toString();
    data = tokenContract.methods.transfer(to_address.toLowerCase(), amountAsString).encodeABI();

    txArgs = {
      to: vm.bounty.token_address,
      from: ethereum.selectedAddress,
      gasPrice: xinfinClient.utils.toHex(await xinfinClient.eth.getGasPrice()),
      gas: xinfinClient.utils.toHex(318730),
      gasLimit: xinfinClient.utils.toHex(318730),
      data: data
    };
  }

  const txHash = await ethereum.request(
    {
      method: 'eth_sendTransaction',
      params: [txArgs],
    }
  );

  callback(null, ethereum.selectedAddress, txHash)

  function callback(error, from_address, txn) {
    if (error) {
      _alert({ message: gettext('Unable to payout bounty due to: ' + error) }, 'error');
      console.log(error);
    } else {

      const payload = {
        payout_type: 'xinfin_ext',
        tenant: 'XINFIN',
        amount: amount,
        token_name: token_name,
        funder_address: from_address,
        payout_tx_id: txn
      };

      modal.closeModal();
      const apiUrlBounty = `/api/v1/bounty/payout/${fulfillment_id}`;

      fetchData(apiUrlBounty, 'POST', payload).then(response => {
        if (200 <= response.status && response.status <= 204) {
          console.log('success', response);

          vm.fetchBounty();
          _alert('Payment Successful');

        } else {
          _alert('Unable to make payout bounty. Please try again later', 'error');
          console.error(`error: bounty payment failed with status: ${response.status} and message: ${response.message}`);
        }
      }).catch(function(error) {
        _alert('Unable to make payout bounty. Please try again later', 'error');
        console.log(error);
      });
    }
  }
};