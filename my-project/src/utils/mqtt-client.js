import {Client} from '@stomp/stompjs'
import api from '../api/index'
import store from '../store'
let client
export default {
  init (onMessageCallback) {
    client = new Client({
      brokerURL: api.QTT_SERVICE,
      // brokerURL: 'ws://192.168.0.56:15674/ws',
      connectHeaders: {
        login: api.MQTT_USERNAME,
        passcode: api.MQTT_PASSWORD
      },
      debug: function (str) {
        // console.log(str)
      },
      heartbeatIncoming: api.HEARTBEAT_IN_SECONDS * 1000,
      heartbeatOutgoing: api.HEARTBEAT_IN_SECONDS * 1000
    })

    client.onConnect = () => {
      let cachedUserInfoData = JSON.parse(sessionStorage.getItem('userAccount') || '{}')
      const queueName = 'message_center_' + api.appCode + '_' + cachedUserInfoData.generalAccountId
      console.log('mq connected!',queueName)
      client.subscribe('/exchange/message_center/' + queueName, onMessageCallback)
    }

    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message'])
      console.log('Additional details: ' + frame.body)
    }

    client.activate()
  },
  publish(){
    // debugger
    let cachedUserInfoData = JSON.parse(sessionStorage.getItem('userAccount') || '{}')
    //1473832444875681794
    const queueName = 'message_center_' + api.appCode + '_' + cachedUserInfoData.generalAccountId
    client.publish({ destination:'/exchange/message_center/' + queueName, body: '{"content":"sss"}' });
  }
}
