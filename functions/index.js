const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase)

return (exports.sendPushNotification = functions.firestore
  .document("users/{userId}/conversas/{conversaId}/messages/{messageId}")
  .onCreate(async (snap, context) => {
    const { userId, conversaId } = context.params
    const { contentTranslated, content, source } = snap.data()

    const data = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("conversas")
      .doc(conversaId)
      .get()
      .then(doc => {
        return doc.data()
      })
      .catch(error => console.log(error))

    const { contactName } = data

    if (source === "2") {
      const payload = {
        notification: {
          title: contactName,
          body: content,
          sound: "default"
        }
      }

      return admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          const { pushToken } = doc.data()
          return admin.messaging().sendToDevice(pushToken, payload)
        })
    } else {
      return null
    }
  }))
