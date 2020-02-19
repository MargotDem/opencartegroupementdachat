export const sendEmail = (adminEmails, action) => {
    adminEmails.forEach(recipient => {
        let templateParams = {
            action,
            recipient
        }
        emailjs.send("gmail", "ocga", templateParams)
            .then(response => {
                console.log("response: ", response)
            })
            .catch(error => {
                console.log("error: ", error)
            })
    })
}
