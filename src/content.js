import {db, auth, functions} from '@/utils'

const guideList = document.querySelector('.guides');

const accountDetails = document.querySelector('.account-details');

const adminItems = document.querySelectorAll('.admin');

// setup guides
export const setupGuides = (data) => {

  if (data.length) {

    let html = '';

    data.forEach(doc => {

      const guide = doc.data();

      const li = `
    
      <li>
      
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      
      </li>
    
    `;

      html += li;

    });

    guideList.innerHTML = html;

  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
  }

};

const loggedOutLinks = document.querySelectorAll('.logged-out');

const loggedInLinks = document.querySelectorAll('.logged-in');

export const setupUI = (user) => {

  if (user) {

    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }

    // account info
    db.collection('users').doc(user.uid).get()
      .then(doc => {

        const html = `
    
          <div>Logged in as ${user.email}</div>
          
          <div>${doc.data().bio}</div>
          
          <div class="pink-text">${user.admin ? 'Admin' : ''}</div>

         `;

        accountDetails.innerHTML = html;

      });

    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');

    loggedOutLinks.forEach(item => item.style.display = 'none');

  } else {

    // hide account info
    accountDetails.innerHTML = '';

    adminItems.forEach(item => item.style.display = 'none');

    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');

    loggedOutLinks.forEach(item => item.style.display = 'block');

  }

};