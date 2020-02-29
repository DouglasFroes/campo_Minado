import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';

import params from './src/params';
import MinedField from './src/components/minedFielde';
import Heade from './src/components/Heade';
import Leve from './src/element/Leve';
import { 
        createMinedBoard,
        cloneBoard,
        openField,
        hadExplosion,
        wonGame,
        showMines,
        inverteFlag,
        flagsUsed
       } from './src/function/logica';

export default class App extends Component{
  
  constructor(props){
    super(props)
     this.state = this.createState()
  }

  minesAmount = () =>{ 
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil( cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return{
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLeve: false,
    }
  }
  
  onOpenField = (row, column) =>{
    const board = cloneBoard(this.state.board);
    openField(board, row, column)
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if(lost){
      showMines(board);
      Alert.alert('Perdeu!:(', 'voce é gado!!');
    }
    if(won){
      Alert.alert('Parabens!:)', 'voçê ganhou!!!');
    }

    this.setState({board, lost, won}); 
  }

  onSelect3 =(row, colmn)=>{
    const board = cloneBoard(this.state.board);
    inverteFlag(board, row, colmn);
    const won = wonGame(board);

    if(won){
      Alert.alert('Parabens!:)', 'voçê ganhou!!!');
    }

    this.setState({board, won});
  }

  onLevelSelect = level =>{
    params.difficultLevel = level;
    this.setState(this.createState());
  }

  render() {
    return (
      <View style={styles.container}>
        <Leve isVisible={this.state.showLeve}
            onLevelSelect={this.onLevelSelect}
            onCancel={()=>this.setState({showLeve: false})}
        />
        <Heade flagLeft={this.minesAmount() - flagsUsed(this.state.board)}
                onNewGame={()=>this.setState(this.createState())} 
               onFlagPress={()=>this.setState({showLeve: true})}
        />
        <View style={styles.board}>
          <MinedField board={this.state.board}  
          onOpenField={this.onOpenField} onSelect2={this.onSelect3}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-end'
    },
    board:{
      alignItems: 'center',
      backgroundColor: '#AAA'
    }
});
