const APIURL = 'https://api.github.com/users/';

const mainEl = document.getElementById('main');
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');

getUser('magnum457');

async function getUser(username) {
  const response = await fetch(APIURL + username);
  const responseData = await response.json();

  createUserCard(responseData);

  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(APIURL + username + '/repos');
  const responseData = await response.json();

  addReposToCard(responseData);
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardHTML = `
    <div class="card">    
      <div class="img-container">
        <img 
          class="avatar"
          src="${user.avatar_url}"
          alt="${user.name}"
        />
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul class="info">
          <li>
            ${user.followers}
            <strong>Followers</strong>
            </li>
          <li>
            ${user.following}
            <strong>Following</strong>
          </li>
          <li>
            ${user.public_repos}
            <strong>Repos</strong>
          </li>
        </ul>

        <h4>Repos:</h4>
        <div class="repos" id="repos">
        </div>
      </div>
    </div>
  `;

  mainEl.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach(repo => {
      const repoEl = document.createElement('a');
      repoEl.classList.add('repo');

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const user = searchEl.value;

  if (user) {
    getUser(user);

    searchEl.value = '';
  }
});