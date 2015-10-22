const React = require('react-native');
const MK = require('react-native-material-kit');
const {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} = React;

var Ripple = require('./Ripple');
const utils = require('../utils');
var Radio = React.createClass({
  checked : false,
  
  getInitialState(){
    return {
      checked : false,
    }
  },

  _handlePress(){
    if(this.checked){
      this.checked = false;
      this.setState({
        checked : false,
      })
    }else{
      this.checked = true;
      this.setState({
        checked : true,
      })
    }
    if(this.props.onPress){
        this.props.onPress()
    }

  },
  isChecked(){
    return this.checked;
  },
  render(){
    const touchableProps = {};

    if (this.props.enabled) {
      Object.assign(touchableProps, utils.extractTouchableProps(this));
    }

    const fabStyle = {};
    if (this.props.fab && (this.state.width > 0 || this.state.height)) {
      let size = Math.min(this.state.width, this.state.height);
      if (!size || size <= 0) {
        size = Math.max(this.state.width, this.state.height);
      }

      fabStyle.width = size;
      fabStyle.height = size;
      fabStyle.borderRadius = size / 2;
    }

    // FIXME mask.borderRadius should eql container's
    // but there's no api to retrieve styleSheet object, using default value here
    const maskProps = {
      maskBorderRadius: fabStyle.borderRadius || utils.toPixels(1),
    };
    var checkStyle = style.rounded;
    if(this.state.checked === true){
      checkStyle = style.checked;
    }
    return  (
      <View style={style.input}>
      <TouchableWithoutFeedback {...touchableProps} onPress={this._handlePress}>
           <Ripple ref="container"
                {...this.props}
                {...maskProps}
                style={[
                  this.props.style,
                  fabStyle,
                ]}
          >
            <View style={checkStyle}></View>
            </Ripple>
        </TouchableWithoutFeedback>
        <Text style={style.label}>Toto</Text>
      </View>
    )
  }
})

var style = StyleSheet.create({
  input : {
    flex : 1,
    flexDirection : 'row',
  },
  rounded : {
    borderRadius : 2,
    borderWidth : 1,
    height : 16,
    width : 16,
    borderStyle : 'solid',
    borderColor : '#000000',
  },
  checked : {
    borderRadius : 8,
    borderWidth : 1,
    height : 16,
    width : 16,
    borderStyle : 'solid',
    borderColor : '#FFFFFF',
  },
  label : {
    marginLeft : 5,
  },
});
module.exports = Radio;
