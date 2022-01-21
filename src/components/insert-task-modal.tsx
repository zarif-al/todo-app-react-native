import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ButtonStyled, TextInputStyled } from 'src/components/_root';

const InsertTaskModal = ({ setVisible, input, setInput, array, setArray }) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    },
  });
  return (
    <>
      <Text style={styles.text}>Add Task</Text>
      <TextInputStyled
        setValue={setInput}
        value={input}
        placeholder="New Task"
        /*  error={error ? true : false} */
      />
      <ButtonStyled
        title="Add"
        onPress={() => {
          const tempArray = [...array];
          tempArray.push({
            name: input,
            completed: false,
          });
          setArray(tempArray);
          setVisible(false);
        }}
      />
    </>
  );
};

export default InsertTaskModal;
