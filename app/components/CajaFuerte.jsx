import React from 'react'
import CombinationLock from 'combination-lock-react'
import 'combination-lock-react/dist/index.css'
import {finishApp} from './../reducers/actions';


export default class CajaFuerte extends React.Component {

  render(){
  let respuesta=this.props.config.answer;
    return(

  <div class="center">
      <div class="CajaFuerte">
      <CombinationLock
        combination= {respuesta} //this.props.config.answer
        height={50}
        onMatch={() => { this.props.dispatch(finishApp(true))
         }}
        openText={'Unlocked!'}
      />
      </div>
      <div class="CajaFuerte">
        <img src="./../assets/images/CajaFuerte.png" width="520px" height="550px" />
      </div>
    </div>
    );
  }
}
