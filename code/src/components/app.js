import React from "react"
import { LineChart, Line, Tooltip, YAxis } from "recharts"
import openGdaxWebsocket from "../gdax-websocket"

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-EUR", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    return (
      <div>
        <LineChart width={400} height={400} data={this.state.tickerMessages}>
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <YAxis type="number" domain={['dataMin', 'dataMax']} />
        </LineChart>
      </div>
    )
  }
}

export default App
