if (document.getElementById('gc-search')) {
  var app = new Vue({
    delimiters: [ '[[', ']]' ],
    el: '#gc-search',
    data: {
      term: '',
      results: [],
      currentTab: 0,
      source_types: [
        'Profile',
        'Bounty',
        'Grant',
        'Kudos',
        'Quest',
        'Page'
      ],
      labels: {
        'Profile': 'Profiles',
        'Bounty': 'Bounties',
        'Grant': 'Grants',
        'Kudos': 'Kudos',
        'Quest': 'Quests',
        'Page': 'Pages'
      }
    },
    mounted() {
      this.search();
    },
    created() {
      this.search();
    },
    methods: {
      search: async function() {
        let vm = this;

        if (vm.term.length > 3) {
          // const response = await fetchData(
          //   `/api/v0.1/search/?term=${vm.term}`,
          //   "GET"
          // );
          // vm.results = groupBySource(response);

          const response = [{'title': 'Send Tip | Gitcoin | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/tip', 'img_url': 'https://s.gitcoin.co/static/v2/images/helmet.6e489cc7352e.png', 'source_type': 'Page'}, {'title': 'Terms of Use | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/legal/terms', 'img_url': '/static/v2/images/helmet.svg', 'source_type': 'Page'}, {'title': 'About | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/about', 'img_url': '/static/v2/images/helmet.svg', 'source_type': 'Page'}, {'title': 'Help | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/help', 'img_url': 'https://s.gitcoin.co/static/v2/card/thumb.ecccf138fcf3.png', 'source_type': 'Page'}, {'title': 'Whitepaper | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/whitepaper', 'img_url': 'https://s.gitcoin.co/static/v2/card/thumb.ecccf138fcf3.png', 'source_type': 'Page'}, {'title': 'Whitepaper | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/whitepaper/accesscode', 'img_url': 'https://s.gitcoin.co/static/v2/card/thumb.ecccf138fcf3.png', 'source_type': 'Page'}, {'title': 'Faucet | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/faucet', 'img_url': 'https://s.gitcoin.co/static/v2/card/thumb.ecccf138fcf3.png', 'source_type': 'Page'}, {'title': 'Mission | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/mission', 'img_url': 'https://s.gitcoin.co/static/v2/images/grow_open_source.cf1e7df2d9f9.png', 'source_type': 'Page'}, {'title': 'Labs | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/labs', 'img_url': 'https://c.gitcoin.co/labs/Articles-Announcing_Gitcoin_Labs.png', 'source_type': 'Page'}, {'title': '$3.3m in  Results | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/results', 'img_url': 'https://s.gitcoin.co/static/v2/images/results_preview.666ede4f3958.gif', 'source_type': 'Page'}, {'title': 'Activity Feed | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/activity', 'img_url': '/static/v2/images/helmet.svg', 'source_type': 'Page'}, {'title': 'Kudos | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/kudos', 'img_url': 'https://s.gitcoin.co/static/v2/images/kudos/assets/kudos-image.15af481a0fdd.png', 'source_type': 'Page'}, {'title': 'Kudos Marketplace | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/kudos/marketplace', 'img_url': 'https://s.gitcoin.co/static/v2/images/kudos/assets/kudos-image.15af481a0fdd.png', 'source_type': 'Page'}, {'title': '  Quests | Gitcoin', 'description': '', 'url': 'https://gitcoin.co/quests', 'img_url': 'https://s.gitcoin.co/static/v2/images/quests/orb_small.b0235b81c961.png', 'source_type': 'Page'}, {'title': 'Gitcoin Genesis', 'description': 'The Gitcoin Genesis Badge is the rarest of the Gitcoin team badges.  Owners of this badge contributed to Gitcoin in a meaningful way in the way-back-when.', 'url': 'https://gitcoin.co/kudos/3/gitcoin_genesis', 'img_url': 'https://gitcoin.co/dynamic/kudos/3/gitcoin_genesis', 'source_type': 'Kudos'}, {'title': 'Gitcoin Bot', 'description': 'Just for fun, this Gitcoin Robot is a way of celebrating the contributors in your life.', 'url': 'https://gitcoin.co/kudos/232/gitcoin_bot', 'img_url': 'https://gitcoin.co/dynamic/kudos/232/gitcoin_bot', 'source_type': 'Kudos'}, {'title': 'Gitcoin Minibot', 'description': 'Just for fun, this Gitcoin Robot is a way of celebrating the contributors in your life.', 'url': 'https://gitcoin.co/kudos/235/gitcoin_minibot', 'img_url': 'https://gitcoin.co/dynamic/kudos/235/gitcoin_minibot', 'source_type': 'Kudos'}, {'title': 'Gitcoin Sun', 'description': 'A very special, limited edition, Kudos, only for sustainers of Gitcoin.', 'url': 'https://gitcoin.co/kudos/237/gitcoin_sun', 'img_url': 'https://gitcoin.co/dynamic/kudos/237/gitcoin_sun', 'source_type': 'Kudos'}, {'title': 'Gitcoin Og', 'description': 'You are an OG.  You are a pioneer of Gitcoin open source!', 'url': 'https://gitcoin.co/kudos/246/gitcoin_og', 'img_url': 'https://gitcoin.co/dynamic/kudos/246/gitcoin_og', 'source_type': 'Kudos'}, {'title': 'Gitcoin Tree', 'description': 'A tree that sustains open source.  Just for fun', 'url': 'https://gitcoin.co/kudos/255/gitcoin_tree', 'img_url': 'https://gitcoin.co/dynamic/kudos/255/gitcoin_tree', 'source_type': 'Kudos'}];

          vm.results = groupBySource(response);

        } else {
          vm.results = {};
        }
      }
    }
  });
}

const groupBySource = results => {
  let grouped_result = {};

  results.map(result => {
    const source_type = result.source_type;

    grouped_result[source_type] ? grouped_result[source_type].push(result) : grouped_result[source_type] = [result];
  });
  return grouped_result;
};