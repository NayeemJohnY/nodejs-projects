const socket = io();
// socket.on("countUpdate", (count) => {
//     console.log("The count is updated", count);
// })


// document.querySelector("[type='button']").addEventListener('click', () => {
//     console.log("Clicked");
//     socket.emit("increment")
// })

// socket.on("welcome", (message) => {
//     console.log(message);
// })
// acknowledge events
const $form = document.querySelector("form")
const $input = document.querySelector("input#message")
const $submit = document.querySelector("button[type='submit']")
$form.addEventListener('submit', (event) => {
    $submit.setAttribute('disabled', 'disabled')
    event.preventDefault();
    message = $input.value
    socket.emit("sendMessage", message, (acknowledgement) => {
        $input.value = ''
        $input.focus()
        console.log("Ack", acknowledgement);
        $submit.removeAttribute('disabled')
    })
})

const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML


const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild;
    // Height of the message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight = $messages.offsetHeight

    //Height of message container
    const containerHeight = $messages.scrollHeight

    //how far how can scroll
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }

}


socket.on("sendMessage", (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        username: message.username,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

const $shareLocation = document.querySelector("#shareLocation")
const locationTemplate = document.querySelector("#location-template").innerHTML
$shareLocation.addEventListener('click', () => {
    $shareLocation.setAttribute('disabled', 'disabled')
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported on this browser")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        var location = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        socket.emit("shareLocation", location, () => {
            console.log("location shared");
            $shareLocation.removeAttribute('disabled')
        })
    })
})

socket.on("shareLocation", (location) => {
    console.log("location of user : ", location);
    const html = Mustache.render(locationTemplate, { url: location.text, username: location.username, createdAt: moment(location.createdAt).format('h:mm a') })
    $messages.insertAdjacentHTML('beforeend', html)
})


const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = "/"
    }
})

const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
const $sidebar = document.querySelector('.chat__sidebar')
socket.on('roomData', ({ room, users }) => {
    console.log(room, users);
    const html = Mustache.render($sidebarTemplate, {
        room,
        users
    })
    $sidebar.innerHTML = html
})