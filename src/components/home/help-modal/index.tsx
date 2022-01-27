import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Overlay, Icon, Divider } from 'react-native-elements';
import { DeleteModalComponentTypes } from 'src/components/home/utils/types';
import { ButtonStyled } from 'src/components/_root';

const HelpModal = ({ visible, setVisible }: DeleteModalComponentTypes) => {
  const styles = StyleSheet.create({
    modalStyle: {
      borderRadius: 10,
      padding: 15,
      width: '85%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    headingOne: {
      fontSize: 20,
      opacity: 0.7,
      fontWeight: '700',
      color: 'black',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'center',
      marginBottom: 10,
    },
    headingTwo: {
      fontSize: 17,
      opacity: 0.7,
      fontWeight: '500',
      color: 'black',
      marginBottom: 5,
      marginLeft: 5,
    },
    text: {
      fontSize: 15,
      color: 'black',
      marginHorizontal: 15,
    },
    iconContainer: {
      position: 'absolute',
      right: 0,
      marginTop: 15,
      zIndex: 10,
    },
    addTaskImg: {
      width: 261,
      height: 43,
      alignSelf: 'center',
    },
    divider: {
      backgroundColor: 'black',
      height: 3,
      marginTop: 10,
      marginBottom: 10,
    },
  });
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={(): void => {
        setVisible(false);
      }}
      overlayStyle={styles.modalStyle}>
      <View style={styles.iconContainer}>
        <ButtonStyled
          icon={<Icon name="close" type="font-awesome" color="gray" />}
          marginRight={10}
          onPress={(): void => {
            setVisible(false);
          }}
        />
      </View>
      <Text style={styles.headingOne}>Help Section</Text>
      <Text style={styles.headingTwo}>Adding a task</Text>
      <Image
        style={styles.addTaskImg}
        source={require('src/images/add_task.png')}
      />
      <Text style={styles.text}>
        You can press on the plus icon to add a task.
      </Text>

      <Divider style={styles.divider} />

      <Text style={styles.headingTwo}>Editing/Deleting a task</Text>
      <Image
        style={styles.addTaskImg}
        source={require('src/images/edit_delete_task.png')}
      />
      <Text style={styles.text}>
        You can press and hold on a task to make the edit and delete icons
        appear. You can press on those to edit/delete your task.
      </Text>
    </Overlay>
  );
};

export default HelpModal;
