/*eslint react/jsx-filename-extension: 0 */
/*eslint react/prop-types: 0 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/CheckCircle';
import HomePageComponent from './HomePageComponent';
import '../styles/ListUrlComponent.css';
import * as Rx from 'rxjs-compat'


class ListUrlComponent extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      listdata: [],
      data:[]
    };
  }


  componentWillMount(){
    Rx.Observable.fromPromise(fetch('/apps').then((data)=>data.json()))
    .subscribe((data)=>{
      this.setState({
        data:data
      })
    });
  }
  
  render(){
    console.log(this.state.data)
  return (
    <div>
      <HomePageComponent />
      {this.state.data.map((x , i) =>
          <div className="root">
            <Card className="card">
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className="avatar">
                    <CheckCircle className="checkCircle" />
                  </Avatar>
                }
                title={x.app_name}
                subheader="September 14, 2016"
              />
            </Card>
          </div>
        )
      }
    </div>
  );
}
}
export default (ListUrlComponent);

