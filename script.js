(function() {
  const API_URL = 'https://randomuser.me/api';
  const btnAddUsr = document.getElementById('add-user');
  const [eleUserTable] = document.getElementsByTagName('table');
  const btnDblMoney = document.getElementById('double-money');
  const btnCalWealth = document.getElementById('calculate-wealth');

  let users = [];
  
  function getUser() {
    return fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const { results } = data;
        const { name } = results[0];

        const user = {
          name: `${name.first} ${name.last}`,
          wealth: Math.floor(Math.random()*1000000)
        };

        return user;
      });
  }

  async function addUser() {
    const user = await getUser();
    const { name, wealth } = user;
    const eleTr = document.createElement('tr');
    const nameTd = document.createElement('td');
    const wealthTd = document.createElement('td');

    nameTd.innerText = name;
    wealthTd.innerText = wealth;

    eleTr.appendChild(nameTd);
    eleTr.appendChild(wealthTd);

    eleUserTable.appendChild(eleTr);

    users.push(user);
  }

  function doubleMoney() {
    users = users.map(user => {
      console.log(user);
      return { ...user, wealth: user.wealth * 2 };
    });
    renderTable(users);
    console.log('Users', users);
  }

  function renderRow(key, value) {
    const eleTr = document.createElement('tr');
    const keyTd = document.createElement('td');
    const valueTd = document.createElement('td');

    keyTd.innerText = key;
    valueTd.innerText = value;

    eleTr.appendChild(keyTd);
    eleTr.appendChild(valueTd);

    eleUserTable.appendChild(eleTr);
  }

  function renderTable(users) {
    eleUserTable.innerHTML = '';
    users.forEach(({ name, wealth }) => {
      const eleTr = document.createElement('tr');
      const nameTd = document.createElement('td');
      const wealthTd = document.createElement('td');

      nameTd.innerText = name;
      wealthTd.innerText = wealth;

      eleTr.appendChild(nameTd);
      eleTr.appendChild(wealthTd);

      eleUserTable.appendChild(eleTr);
    });
  }

  function showMillionaire() {
    const millionaires = users.filter(user => user.wealth > 1000000);
    renderTable(millionaires);
  }

  function getTotalWealth() {
    const total = users.reduce((total, user) => total + user.wealth, 0);
    renderRow('TotalWealth', total);

    console.log('Total Wealth', total);
  }

  btnAddUsr.addEventListener('click', addUser);
  btnDblMoney.addEventListener('click', doubleMoney);
  btnCalWealth.addEventListener('click', getTotalWealth);
})();
