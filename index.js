function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);

  const repoListItems = repos.map((r) => {
    let repoListItem = '<li>';
    repoListItem += `<a href="${r.html_url}">${r.name}</a>`;
    repoListItem += ' - ';
    repoListItem += `<a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a>`;
    repoListItem += ' - ';
    repoListItem += `<a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>`;
    repoListItem += '</li>';
    return repoListItem;
  });

  const repoListHTML = `<ul>${repoListItems.join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoListHTML;
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText);

  const commitsListItems = commits.map((commit) => {
    let commitsListItem = '<li>';
    commitsListItem += `<strong>${commit.author.login} (${commit.commit.author.name})</strong>`;
    commitsListItem += ` - ${commit.commit.message}`;
    commitsListItem += '</li>';
    return commitsListItem;
  });

  const commitsTitleHTML = `<h4>Commits</h4>`;
  const commitsListHTML = `<ul>${commitsListItems.join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsTitleHTML + commitsListHTML;
}

function displayBranches(activity, data) {
  const branches = JSON.parse(this.responseText);
  const branchesListItems = branches.map(branch => `<li>${branch.name}</li>`);
  const branchesTitleHTML = `<h4>Branches</h4>`;
  const branchesListHTML = `<ul>${branchesListItems.join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesTitleHTML + branchesListHTML;
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('get', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(element) {
  const repository = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('get', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function getBranches(element) {
  const repository = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('get', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}
