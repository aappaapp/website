// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDkSOCf6OlKlQK7dpJytnsZECWczfYApCo",
    authDomain: "webdb200101.firebaseapp.com",
    databaseURL: "https://webdb200101.firebaseio.com",
    projectId: "webdb200101",
    storageBucket: "webdb200101.appspot.com",
    messagingSenderId: "485833164369",
    appId: "1:485833164369:web:66144cf75de59218461a70",
    measurementId: "G-DXYPZLMPD7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
firebase.database().ref('game3').on('value', (snapshot) => {
    const data = snapshot.val();
});
function dice(amount, sideval) {
    returnval = '';
    for (i = 0; i < amount; i++) {
        random = Math.floor(Math.random() * sideval) + 1;
        if (i != 0) {
            returnval += ' + '
        }
        returnval += random;
    }
    returnval += ' = ' + eval(returnval);
    return returnval;
}
function changeref(oldRef, newRef) {
    firebase.database().ref('game3/' + oldRef).once('value').then((snapshot) => {
        var data = (snapshot.val()) || 'Anonymous';
        firebase.database().ref('game3/' + newRef).set(data);
        firebase.database().ref('game3/' + oldRef).remove();
    });
}
function sendcommand(command, callback) {
    if (command[0] == '/') {
        if (command.includes('D')) {
            var i;
            command1 = command.split('D');
            randomval = [];
            console.log(command1[0]);
            for (i = 0; i < command1[0]; i++) {
                randomval[i] = Math.floor(Math.random() * command1[1]) + 1;
            }
            console.log(randomval);
            returnval = '[ ' + command + ':' + randomval + ' ] => ' + dice(command1[0], command1[1]);
        } else if (command.includes('serverid')) {
            command1 = command.split(' ');
            changeref('server/' + window.server.id, 'server/' + command1[1]);
            returnval = 'System: The server\'s name is changed. Please reload and enter the new id.'
        } else if (command.includes('deleteserver')) {
            firebase.database().ref('game3/server/' + window.server.id).remove();
            returnval = 'System: The server is deleted. Please reload to quit.'
        } else if (command.includes('character')) {
            command1 = command.split(' ');
            if (typeof window.character[command1[1]] != 'undefined') {
                returnval = 'System: Your character is changed to ' + window.character[command1[1]];
            } else {
                returnval = 'System: Sorry, We can\'t find your character.';
            }
        } else if (command.includes('mod')) {
            command1 = command.split(' ');
            $.get('./mod/' + command1[1] + '/manifest.json', function (data) {
                firebase.database().ref('game3/server/' + window.server.id + '/mod').set({
                    id: data.header.id
                });
            });
            $.get('./mod/' + command1[1] + '/character.json', function (data) {
                console.log(data);
                window.character = data;
                firebase.database().ref('game3/server/' + window.server.id + '/character').set(window.character);
                returnval = 'System: The Mod is changed to: ' + command1[1];
            });
        }
    } else {
        returnval = command;
    }
    setTimeout(function () {
        callback(returnval);
    }, 500);
}
function displaymsg(data) {
    $('.msgdisplay').val($('.msgdisplay').val() + '\n' + data);
    $('.msgdisplay').scrollTop($('.msgdisplay')[0].scrollHeight - $('.msgdisplay').height());
}
function displaycommand(command) {
    sendcommand(command, function (data) {
        $('.cmdenter').val('');
        displaymsg(data);
    });
}
function goserver() {
    $('.homearea').hide();
    $('.gamearea').show();
    generatewindow({
        title: 'a',
        content: '<textarea class=\'msgdisplay\' readonly>This will display all message.</textarea><br><input type=\'text\' class=\'cmdenter\'><input type=\'button\' value=\'Send\' class=\'cmdsendbtn\'>',
        css: {
            '.title': {
                color: 'lightgrey'
            },
            textarea: {
                margin: '10px'
            },
            input: {
                color: 'black',
                'border-color': 'black',
                margin: '10px'
            },
            '.close': {
                display: 'none'
            }
        },
        callback: function () {
            $('.cmdenter').keydown(function () {
                if (event.key == 'Enter') {
                    displaycommand($('.cmdenter').val());
                }
            });
            $('.cmdsendbtn').click(function () {
                displaycommand($('.cmdenter').val());
            });
        }
    });
    generatewindow({
        title: 'Your Character Info',
        content: 'Nothing.'
    });
}
$(function () {
    closewindow($('[data-windowvalue=\'0\']'));
    generatewindow({
        title: 'SignIn / SignUp Window',
        content: '<div class=\'email\'>Email: <input type=\'text\' class=\'email\'></div><br><div class=\'password\'>Password: <input type=\'text\' class=\'password\'></div><br><div class=\'signcontainer\'><div class=\'signinbtn btn\'>SignIn</div><div class=\'signupbtn btn\'>SignUp</div></div>',
        css: {
            '.title': {
                'background-color': 'white',
                'border-bottom': '1px solid black'
            },
            '.close': {
                display: 'none'
            },
            input: {
                'border-color': 'black',
                color: 'black'
            }
        },
        callback: function () {
            $('.signinbtn').click(login);
            $('.signupbtn').click(signup);
        }
    });
    $(document).keydown(function () {
        if (event.key == 'F11') {
            event.preventDefault();
        } else if (event.key == 'Alt') {
            event.preventDefault();
        }
    });
    $('.startbtn').click(function () {
        $('.startbtn').remove();
        $('.title').append('<input type=\'text\' placeholder=\'Server Id...\' class=\'serverinput\'><input type=\'button\' value=\'Create Server\' class=\'serverjoinbtn\'>');
        $('.serverinput').change(function () {
            firebase.database().ref('/game3/server/' + $('.serverinput').val()).once('value').then((snapshot) => {
                var data = (snapshot.val()) || 'Anonymous';
                window.server = {
                    exist: false,
                    id: $('.serverinput').val()
                }
                if (data == 'Anonymous') {
                    window.server.exist = false;
                    $('.serverjoinbtn').val('Create Server');
                } else {
                    window.server.exist = true;
                    $('.serverjoinbtn').val('Join Server');
                }
            });
        });
        $('.serverjoinbtn').click(function () {
            if (window.server.exist == false) {
                firebase.database().ref('game3/server/' + window.server.id).set({
                    owner: $.cookie('uid'),
                    online: [$.cookie('uid')]
                });
            } else if (window.server.exist == true) {
                firebase.database().ref('game3/server/' + window.server.id + '/online/').once('value').then((snapshot) => {
                    var data = (snapshot.val()) || 'Anonymous';
                    firebase.database().ref('game3/server/' + window.server.id + '/online/' + Object.keys(data).length).set($.cookie('uid'));
                });
            }
            goserver();
        });
    });
});
