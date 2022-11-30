import React, { useState,useEffect } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, TextInput, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { BottomSheet } from '@rneui/themed';
import { db } from "../../firebaseConfig";

const { width } = Dimensions.get("screen");

const EditProfileScreen = ({ navigation }) => {

    const [fullNameDialog, setFullnameDialog] = useState(false);
    const [fullName, setFullName] = useState('Ellison Perry');
    const [changeText, setChangeText] = useState(fullName);

    const [passwordDialog, setPasswordDialog] = useState(false);
    const [password, setPassword] = useState('123456');
    const [changePassword, setChangePassword] = useState(password);
    const [image, setImage] = useState(null);
    const [phoneDialog, setPhoneDialog] = useState(false);
    const [phone, setPhone] = useState('123456789');
    const [changePhone, setChangePhone] = useState(phone);

    const [emialDialog, setEmailDialog] = useState(false);
    const [email, setEmail] = useState('test@abc.com');
    const [changeEmail, setChangeEmail] = useState(email);

    const [isBottomSheet, setIsBottomSheet] = useState(false);
    async function fetch_img() {
        await db
          .collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
          .get()
          .then((res) => {
            console.log("----",res);
            setImage(res.data()["base64"]);
          })
      }
    fetch_img();
    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need camera roll permissions to make this work!");
            }
          }
        })();
      }, []);

    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
    
        if (!result.cancelled) {
          setImage(result.base64);
          console.log("-----");
        }
        db.collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
               .set({"base64":"hey"})
               .then((res) => {
                   console.log("posted one");
               });
               db.collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
               .set({"base64":image})
               .then((res) => {
                   console.log("Image pushed!");
                   fetch_img();
               });
      };

      const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
           let data =  await ImagePicker.launchCameraAsync({
             mediaTypes:ImagePicker.MediaTypeOptions.Images,
             allowsEditing:true,
             aspect:[1,1],
             quality:0.5,
             base64: true,
           })
          if(!data.cancelled){
            console.log("setting pic")
            setImage(data.base64); 
           }    
        //    var test_json = {};
        //    test_json["base64"] = image
           db.collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
               .set({"base64":"hey"})
               .then((res) => {
                   console.log("posted one");
               });
               db.collection("Data").doc("oYgL6pfD9HvkXCbNhRBQ")
               .set({"base64":image})
               .then((res) => {
                   console.log("Image pushed!");
                   fetch_img();
               });
        }
        else{
          Alert.alert("you need to give up permission to work")
        }
      }

    const clickImage = () => {
        console.log("Here")
        pickFromCamera();
    };

    function backArrowAndSave() {
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => navigation.pop()}
                />

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
                    <Text style={{ ...Fonts.primaryColor17Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function profilePhoto() {
        return (
            <View style={styles.profilePhotoWrapStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Image source={require('../../assets/images/user/user_1.jpg')}
                        style={styles.profilePhotoStyle}
                        resizeMode="cover"
                    /> */}
                     <Image style={styles.profilePhotoStyle}
                            source={{ uri: `data:image/jpeg;base64,${image}` }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsBottomSheet(true)}
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="ios-add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function formData({ title, value }) {
        return (
            <View style={styles.formDataContainerStyle}>
                <View style={{ width: width / 3.0, }}>
                    <Text style={{ ...Fonts.grayColor17Regular }}>{title}</Text>
                </View>
                <View style={{
                    flexDirection: "row", justifyContent: 'space-between', width: width / 1.85
                }}>
                    <Text style={{ ...Fonts.blackColor17Regular, }}>{value}</Text>
                    <Feather name="chevron-right" size={24} color={Colors.grayColor} />
                </View>
            </View>
        )
    }

    function editFullNameDialog() {
        return (
            <Dialog.Container visible={fullNameDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change FullName
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setFullnameDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setFullnameDialog(false)
                            setFullName(changeText)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Regular }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editPasswordDialog() {

        return (
            <Dialog.Container visible={passwordDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Change Your Password
                    </Text>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                    }}>
                        <TextInput
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                            placeholder='Old Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%', marginTop: Sizes.fixPadding, }}>
                        <TextInput
                            onChangeText={(value) => setChangePassword(value)}
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                            placeholder='New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                            placeholder='Confirm New Password'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPasswordDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setPasswordDialog(false)
                                setPassword(changePassword);
                            }}
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Regular }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>

        )
    }

    function editPhoneDialog() {
        return (
            <Dialog.Container visible={phoneDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding * 3.0, }}>Change Phone Number</Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changePhone}
                            onChangeText={(value) => setChangePhone(value)}
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPhoneDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setPhoneDialog(false)
                            setPhone(changePhone)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Regular }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editEmailDialog() {
        return (
            <Dialog.Container visible={emialDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding * 3.0, }}>Change Email</Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changeEmail}
                            onChangeText={(value) => setChangeEmail(value)}
                            style={{ ...Fonts.blackColor17Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setEmailDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setEmailDialog(false)
                            setEmail(changeEmail)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Regular }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function showBottomSheet() {

        return (
            <BottomSheet
                isVisible={isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => setIsBottomSheet(false)}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor18Regular, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        Choose Option
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={clickImage}>
                            <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
                            <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity onPress={uploadImage}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>
            </BottomSheet>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrowAndSave()}
                {profilePhoto()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setFullnameDialog(true)
                        setChangeText(fullName);
                    }}
                >
                    {formData({ title: 'Full Name', value: fullName })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setPasswordDialog(true)
                        setChangePassword(password);
                    }}
                >
                    {formData({ title: 'Password', value: '******' })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangePhone(phone);
                        setPhoneDialog(true);
                    }}
                >
                    {formData({ title: 'Phone', value: phone })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangeEmail(email);
                        setEmailDialog(true)
                    }}
                >
                    {formData({ title: 'Email', value: email })}
                </TouchableOpacity>
                {editFullNameDialog()}
                {editPasswordDialog()}
                {editPhoneDialog()}
                {editEmailDialog()}
                {showBottomSheet()}
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    backArrowAndSaveContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0
    },
    addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 25.0, width: 25.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 5.0,
        right: 5.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50.0,
        marginBottom: Sizes.fixPadding * 3.0
    },
    formDataContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 65.0,
        borderColor: '#F6F6F6',
        elevation: 1,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    profilePhotoStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    }
})

export default EditProfileScreen;