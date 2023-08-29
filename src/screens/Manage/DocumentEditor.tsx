import { useNavigation, useRoute } from '@react-navigation/native';
import { selectAccessToken } from '@stores/Slices';
import {
  DraggedElArr,
  DraggedElement,
  GenerateSignature,
  GenerateSignatureDetail,
  GenerateSignatureDetails,
  HtmlEditorAPI,
  RootStackScreenProps,
} from '@type/index';
import axios from 'axios';
import FormData from 'form-data';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Draggable from 'react-native-draggable';
import {
  Appbar,
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  Text,
} from 'react-native-paper';
import { Carousel } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import tw from 'twrnc';

const { width, height } = Dimensions.get('window');

const icons = {
  company: 'office-building',
  date: 'calendar',
  email: 'email',
  initial: 'signature-text',
  name: 'face-man',
  signature: 'draw',
  stamp: 'stamper',
  title: 'briefcase',
};

const color = [
  {
    primary: 'rgb(9, 131, 55)',
    bg: 'rgba(180, 255, 175, 0.88)',
    border: '#098337',
    background: '#b4ffafe0',
  },
  {
    primary: 'rgb(83 107 158)',
    bg: 'rgb(210 223 255 / 92%)',
    border: '#536b9e',
    background: '#d2e9ffeb',
  },
  {
    primary: 'rgb(167 108 0)',
    bg: 'rgb(255 237 161 / 92%)',
    border: '#a76c00',
    background: '#ffeda1eb',
  },
  {
    primary: 'rgb(161 67 178)',
    bg: 'rgb(255 183 247 / 92%)',
    border: '#974b4b',
    background: '#ffb7f7eb',
  },
  {
    primary: 'rgb(151 75 75)',
    bg: 'rgb(255 188 188 / 92%)',
    border: '#974b4b',
    background: '#ffbcbceb',
  },
  {
    primary: 'rgb(151 75 75)',
    bg: 'rgb(255 188 188 / 92%)',
    border: '#974b4b',
    background: '#ffbcbceb',
  },
  {
    primary: 'rgb(151 75 75)',
    bg: 'rgb(255 188 188 / 92%)',
    border: '#974b4b',
    background: '#ffbcbceb',
  },
];
const DocumentEditor = () => {
  const accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation<RootStackScreenProps<'DocumentEditor'>['navigation']>();
  const route = useRoute<RootStackScreenProps<'DocumentEditor'>['route']>();
  const [draggedElArr, setDraggedElArr] = useState<DraggedElArr>({
    signature: [],
    initial: [],
    stamp: [],
    date: [],
    name: [],
    email: [],
    company: [],
    title: [],
  });
  const [recipients, setRecipients] = useState<GenerateSignatureDetail[]>();
  const [selectedRecipient, setSelectedRecipient] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GenerateSignatureDetails[]>();
  const [scroll, setScroll] = useState(true);
  const [imageSizes, setImageSizes] = useState<
    { x: number; y: number; width: number; height: number; pageX: number; pageY: number }[]
  >(new Array());
  console.log('Imagesizes', imageSizes);
  const FlatListRef = useRef<FlatList>();
  const marker = useRef<View>();

  // const envelope: GenerateSignature = route.params?.Envelope;
  const envelope: GenerateSignature = {
    uniqid: '6548ab57315fc20a5bc10f70d033fbd3',
    signature_id: 1,
  };
  const [index, setIndex] = useState(0);

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  // console.log(images);

  const carousel = useRef<typeof Carousel>();
  // console.log(envelope);

  const fetchData = async () => {
    setLoading(true);

    const url = 'https://docudash.net/api/generate-signature/html-editor/';
    const testurl = url + 'a9b8ff85878e5d36920543b2b3d4aa69' + '/' + 407;
    // console.log(url + envelope.uniqid + '/' + envelope.signature_id);

    axios
      .get(url + envelope.uniqid + '/' + envelope.signature_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log('html-editor', response.data);
        const {
          status,
          message,
          generateSignatureDetailsFinalise,
          generateSignatureDetails,
          generateSignatureDetailsImages,
        }: HtmlEditorAPI = response.data;

        if (status) {
          if (generateSignatureDetailsFinalise && generateSignatureDetailsFinalise.draggedElArr) {
            const draggable = {
              signature: generateSignatureDetailsFinalise.draggedElArr.signature ?? [],
              initial: generateSignatureDetailsFinalise.draggedElArr.initial ?? [],
              stamp: generateSignatureDetailsFinalise.draggedElArr.stamp ?? [],
              date: generateSignatureDetailsFinalise.draggedElArr.date ?? [],
              name: generateSignatureDetailsFinalise.draggedElArr.name ?? [],
              email: generateSignatureDetailsFinalise.draggedElArr.email ?? [],
              company: generateSignatureDetailsFinalise.draggedElArr.company ?? [],
              title: generateSignatureDetailsFinalise.draggedElArr.title ?? [],
            };
            setDraggedElArr(draggable);
            console.log('draggedElArr', draggedElArr);
          }
          setRecipients(generateSignatureDetails);
          setImages(generateSignatureDetailsImages);
        } else {
          alert(message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error----', error);
      });
  };
  useEffect(() => {
    if (envelope) {
      fetchData();
    }
  }, []);

  const save = (type: number) => {
    const url = 'https://docudash.net/api/generate-signature/html-editor/';
    console.log(`Bearer ${accessToken}`);
    console.log('post', url + envelope.uniqid + '/' + envelope.signature_id);
    const data = new FormData();
    data.append('uniqid', envelope.uniqid);
    data.append('signature_id', envelope.signature_id);
    data.append('draggedElArr', JSON.stringify(draggedElArr));
    // save for 0 send for 1
    data.append('save_type', type);

    console.log('data', JSON.stringify(data));

    axios
      .post(url + envelope.uniqid + '/' + envelope.signature_id, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const { status, message }: { status: boolean; message: string } = response.data;
        if (status) {
          alert(message);

          navigation.navigate('Home', {
            screen: 'INBOX',
            params: { heading: 'Sent' },
          });
        } else {
          alert(message);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  // const _onViewableItemsChanged = useCallback(
  //   ({ viewableItems, changed }: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
  //     console.log('Visible items are', viewableItems[0]?.index);
  //     setIndex(viewableItems[0]?.index ?? 0);
  //     // console.log('Changed in this iteration', changed);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   FlatListRef?.current?.scrollToIndex({
  //     animated: true,
  //     index: index + 1,
  //   });
  // }, [index]);

  return (
    <View style={tw`h-full `}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            <View style={tw`items-center`}>
              <Text variant="titleSmall">Editing Document</Text>
              <Text variant="labelSmall">Subtitle</Text>
            </View>
          }
        />
        <Button
          onPress={() => {
            save(0);
          }}
        >
          Send
        </Button>
      </Appbar.Header>
      <SafeAreaView style={tw`flex-1 bg-white `}>
        <View style={tw` bg-white bottom-0 `}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* draw */}
            {recipients
              ?.filter((x) => x.sign_type == '1')
              .slice(0, 5)
              ?.map((item, index) => (
                <View style={[styles.botton_view_buttons]}>
                  {index == selectedRecipient ? (
                    <Badge style={tw`absolute top-0 right-2 z-1`}>✓</Badge>
                  ) : null}
                  <View style={styles.yellow_round}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedRecipient(index);
                      }}
                    >
                      <Avatar.Text
                        size={48}
                        style={tw`bg-[${color[index].background}]`}
                        // color={color[index].background}
                        label={item.recName
                          .replace(/\b(\w)\w+/g, '$1.')
                          .replace(/\s/g, '')
                          .replace(/\.$/, '')
                          .toUpperCase()}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.yellow_round_text}>{item.recName}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
        <View style={tw`flex-1`}>
          <FlatList
            ref={FlatListRef}
            data={images}
            scrollEnabled={scroll}
            // onViewableItemsChanged={_onViewableItemsChanged}
            // viewabilityConfig={{
            //   itemVisiblePercentThreshold: 50,
            // }}

            renderItem={({ item, index }) => {
              let imageUrl = '';
              if (item.image?.includes('pdf')) {
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/converted/' +
                  item.image.split('.')[0] +
                  '-1.jpg';
              } else {
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/' + item.image;
              }
              // console.log(imageUrl);
              return (
                <View
                  id={index + '_'}
                  ref={marker}
                  style={tw`my-2 relative `}
                  // ref={(ref) => { marker = ref }}
                  onLayout={({ nativeEvent }) => {
                    if (marker) {
                      marker.current.measure((x, y, width, height, pageX, pageY) => {
                        setImageSizes((prev) => [...prev, { x, y, width, height, pageX, pageY }]);
                        console.log('data of the view', x, y, width, height, pageX, pageY);
                      });
                    }
                  }}
                >
                  <AutoHeightImage
                    width={width}
                    source={{
                      uri: imageUrl,
                    }}
                    style={tw`border`}
                  />

                  {[
                    // ...draggedElArr?.company,
                    // ...draggedElArr?.date,
                    // ...draggedElArr?.email,
                    // ...draggedElArr?.initial,
                    // ...draggedElArr?.name,
                    ...draggedElArr?.signature,
                    // ...draggedElArr?.stamp,
                    // ...draggedElArr?.title,
                  ]
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, elementIndex) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      // console.log(Number.parseFloat(item.left), item.top);
                      // console.log(icons[item.type]);
                      console.log('image Height and width', imageSizes[index]);

                      return (
                        <Draggable
                          onPressIn={() => {
                            // Vibration.vibrate(); // Vibration from react-native, i.e vibrate to make it easy to understand for user
                            setScroll(false); // important step to disable scroll when long press this button
                          }}
                          onPressOut={() => {
                            setScroll(true); // important step to enable scroll when release or stop drag
                          }}
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          key={elementIndex}
                          onDragRelease={(event, gestureState, bounds) => {
                            const nativeEvent = event.nativeEvent;
                            console.log('pageX', nativeEvent.pageX);
                            console.log('pageY', nativeEvent.pageY);
                          }}
                          minX={0}
                          maxX={0 + width}
                          minY={imageSizes[index].y}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon={icons[item.type]}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>{item.type}</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                </View>
              );
            }}
          />
          <Chip style={tw`absolute top-1 right-1 `}>
            <Text variant="labelLarge">{` ${index + 1} / ${images?.length} `}</Text>
          </Chip>
        </View>
        <View style={tw` bg-white bottom-0 `}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* draw */}
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="draw"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'signature',
                      element_container_id: `canvasInner-${index}`,
                      left: '10%',
                      top: '10%',
                      icon: 'fa fa-user-circle-o',
                      name: 'Signature',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      signature: [...prev?.signature, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Signature</Text>
            </View>
            {/* Initials */}
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="signature-text"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'initial',
                      element_container_id: `canvasInner-${index}`,
                      left: '20%',
                      top: '20%',
                      icon: 'fa fa-user-circle-o',
                      name: 'initial',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      initial: [...prev?.initial, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Initials</Text>
            </View>
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="stamper"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'stamp',
                      element_container_id: `canvasInner-${index}`,
                      left: '30%',
                      top: '30%',
                      icon: 'fa fa-user-circle-o',
                      name: 'stamp',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      stamp: [...prev?.stamp, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Stamp</Text>
            </View>
            {/* Date */}
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="calendar"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'date',
                      element_container_id: `canvasInner-${index}`,
                      left: '40%',
                      top: '40%',
                      icon: 'fa fa-user-circle-o',
                      name: 'date',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      date: [...prev?.date, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Date</Text>
            </View>
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="face-man"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'name',
                      element_container_id: `canvasInner-${index}`,
                      left: '40%',
                      top: '40%',
                      icon: 'fa fa-user-circle-o',
                      name: 'name',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      name: [...prev?.name, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Name</Text>
            </View>
            {/* Text box */}
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="email"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'email',
                      element_container_id: `canvasInner-${index}`,
                      left: '40%',
                      top: '40%',
                      icon: 'fa fa-user-circle-o',
                      name: 'email',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      email: [...prev?.email, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Email</Text>
            </View>
            {/* Name */}
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="office-building"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'company',
                      element_container_id: `canvasInner-${index}`,
                      left: '40%',
                      top: '40%',
                      icon: 'fa fa-user-circle-o',
                      name: 'company',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      company: [...prev?.company, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Company</Text>
            </View>
            <View style={styles.botton_view_buttons}>
              <View style={[styles.yellow_round, tw`bg-[${color[selectedRecipient].background}]`]}>
                <IconButton
                  icon="briefcase"
                  onPress={() => {
                    const newData: DraggedElement = {
                      type: 'title',
                      element_container_id: `canvasInner-${index}`,
                      left: '40%',
                      top: '40%',
                      icon: 'fa fa-user-circle-o',
                      name: 'title',
                      uuid: 0,
                      selected_user_id: String(
                        recipients?.find((x, i) => i == selectedRecipient)?.id
                      ),
                      colors: color[selectedRecipient],
                    };
                    setDraggedElArr((prev) => ({
                      ...prev,
                      title: [...prev?.title, newData],
                    }));
                  }}
                ></IconButton>
              </View>
              <Text style={styles.yellow_round_text}>Title</Text>
            </View>
          </ScrollView>
        </View>
        <View style={tw`flex-row  bg-white items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <IconButton
              icon="chevron-down"
              onPress={() => {
                if (index < images.length - 1) setIndex((prev) => prev + 1);
              }}
            ></IconButton>

            <IconButton
              icon="chevron-up"
              onPress={() => {
                console.log(index, images.length);
                if (index >= images.length - 1) setIndex((prev) => prev - 1);
              }}
            ></IconButton>
            <Text variant="labelLarge">{` ${index + 1} / ${images?.length} documents`}</Text>
          </View>
          <View style={tw`flex-row `}>
            <IconButton icon="magnify" onPress={() => {}}></IconButton>
            <Menu
              // anchorPosition="top"
              visible={visible}
              onDismiss={closeMenu}
              anchor={<IconButton icon="dots-horizontal" onPress={openMenu}></IconButton>}
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  save(0);
                }}
                title="Save and close"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  save(1);
                }}
                title="Send and close"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                }}
                title="Discard"
              />
              <Divider />
              <Menu.Item onPress={() => {}} title="Edit message" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Edit Recipient" />
              <Divider />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                }}
                title="Edit document"
              />
            </Menu>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DocumentEditor;

const styles = StyleSheet.create({
  botton_view_buttons: tw`items-center mx-2 w-20 h-20 gap-1 justify-center`,
  yellow_round: tw`h-12 w-12 rounded-full bg-yellow-200 justify-center items-center`,
  yellow_round_text: tw``,
});
