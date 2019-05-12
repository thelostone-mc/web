let widget = null;

/*
  Note: Transfer : ACH / Debit
  
  # Debit
  Limit   : 40$ 
  Fee     : 2.9% + 30¢

  ## Test
  Address : 101 Mission Street, (No suite number)
            San Francisco, CA 94105
  Card    : 9401113999999995
  Exp     : 10/2020

  # ACH
  Plaid username: user_good / password: pass_good
*/


const initWyre = () => {

  if(typeof(Wyre) == 'undefined') {
    console.log('warn: wyre not initialized.');
    return;
  }

  const config_ACH = {
    env: isProd() ? 'prod' : 'test',
    accountId: 'AC_MPPDBQZ86VW',
    auth: { type: 'metamask' },
    operation: {
      type: 'onramp',
      destCurrency: 'ETH'
    }
  };

  const config_debit = {
    env: isProd() ? 'prod' : 'test',
    accountId: 'AC_MPPDBQZ86VW',
    auth: { type: "metamask" },
    operation: {
      type: "debitcard",
      dest: "ethereum:0x98B031783d0efb1E65C4072C6576BaCa0736A912",
      sourceCurrency: "USD",
      destCurrency: "ETH",
      destAmount: 0.03
    }
  };

  widget = new Wyre.Widget(config_ACH);
}

initWyre();

$('#wyre-verify').on('click', () => {
  if(!widget) initWyre();

  widget.open();
});

widget.on('ready', event => {
  console.log('wyre: ready state');
  console.log(event);
});

widget.on('complete', event => {
  console.log('wyre: operation complete');
  console.log(event);
});

widget.on('close', event => {
  if(event.error)
    console.log("wyre: closing widget due to error", e.error);
  else
    console.log("wyre: widget closed")
});