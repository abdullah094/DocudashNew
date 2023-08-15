import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import FormData from 'form-data';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Draggable from 'react-native-draggable';
import { Appbar, Avatar, Badge, Button, IconButton, Text } from 'react-native-paper';
import tw from 'twrnc';
import {
  DraggedElArr,
  DraggedElement,
  GenerateSignature,
  GenerateSignatureDetail,
  GenerateSignatureDetails,
  HtmlEditorAPI,
  RootStackScreenProps,
} from '@type/index';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@stores/Slices';
import { Carousel, Image } from 'react-native-ui-lib';
import AutoHeightImage from 'react-native-auto-height-image';
import { current } from '@reduxjs/toolkit';

const { width, height } = Dimensions.get('window');

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
  const envelope: GenerateSignature = route.params.Envelope;
  const [index, setIndex] = useState(0);

  const carousel = useRef<typeof Carousel>();
  console.log(envelope);

  const fetchData = async () => {
    setLoading(true);
    const url = 'https://docudash.net/api/generate-signature/html-editor/';
    console.log(url + envelope.uniqid + '/' + envelope.signature_id);

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

  const save = () => {
    const url = 'https://docudash.net/api/generate-signature/html-editor/';
    console.log(`Bearer ${accessToken}`);
    console.log('post', url + envelope.uniqid + '/' + envelope.signature_id);
    const data = new FormData();
    data.append('uniqid', envelope.uniqid);
    data.append('signature_id', envelope.signature_id);
    data.append('draggedElArr', JSON.stringify(draggedElArr));
    data.append('save_type', '0');

    console.log(JSON.stringify(data));
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

  return (
    <View style={tw`h-full `}>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            <View style={tw`items-center`}>
              <Text variant="titleSmall">Sign</Text>
              <Text variant="labelSmall">Subtitle</Text>
            </View>
          }
        />
        <Button onPress={save}>Save</Button>
      </Appbar.Header>
      <SafeAreaView style={tw`flex-1 `}>
        <View style={tw` bg-white bottom-0 `}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {/* draw */}
            {recipients?.slice(0, 5)?.map((item, index) => (
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
          <Carousel
            ref={carousel}
            horizontal={false}
            onChangePage={(currentPage: number) => setIndex(currentPage)}
          >
            {images?.map((item) => {
              let imageUrl = '';
              if (item.image?.includes('pdf')) {
                item.image.split('.')[0] + '-1.jpg';
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/converted/' +
                  item.image.split('.')[0] +
                  '-1.jpg';
              } else {
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/' + item.image;
              }
              console.log(imageUrl);
              return (
                <View id={index + '_'}>
                  <AutoHeightImage
                    width={width}
                    source={{
                      uri: imageUrl,
                    }}
                  />
                  {draggedElArr?.company
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="office-building"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Company</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.date
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="calendar"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Date</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.email
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="email"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Email</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.initial
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="signature-text"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Initial</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.name
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="face-man"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Name</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.signature
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log('rerender', `bg-[${color[index].bg}]`);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="draw"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Signature</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.stamp
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="stamper"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Stamp</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.title
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="briefcase"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Title</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                </View>
              );
            })}
          </Carousel>
          {/* <FlatList
            data={images}
            renderItem={({ item, index }) => {
              let imageUrl = '';
              if (item.image?.includes('pdf')) {
                item.image.split('.')[0] + '-1.jpg';
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/converted/' +
                  item.image.split('.')[0] +
                  '-1.jpg';
              } else {
                imageUrl =
                  'https://docudash.net/public/uploads/generateSignature/photos/' + item.image;
              }
              console.log(imageUrl);
              return (
                <View id={index + '_'}>
                  <AutoHeightImage
                    width={width}
                    source={{
                      uri: imageUrl,
                    }}
                  />
                  {draggedElArr?.company
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="office-building"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Company</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.date
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="calendar"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Date</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.email
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="email"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Email</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.initial
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="signature-text"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Initial</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.name
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item, index) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="face-man"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Name</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.signature
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log('rerender', `bg-[${color[index].bg}]`);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="draw"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Signature</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.stamp
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="stamper"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Stamp</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                  {draggedElArr?.title
                    ?.filter(
                      (x) =>
                        x.element_container_id == `canvasInner-${index}` &&
                        x.selected_user_id == String(recipients?.[selectedRecipient].id)
                    )
                    .map((item) => {
                      // console.log(
                      //   ((Number.parseInt(item.left) * 100) / width) * 15,
                      //   ((Number.parseInt(item.top) * 100) / width) * 15
                      // );
                      console.log(Number.parseFloat(item.left), item.top);

                      return (
                        <Draggable
                          x={((Number.parseInt(item.left) * 100) / width) * 15}
                          y={((Number.parseInt(item.top) * 100) / width) * 15}
                          // renderColor="red"
                          renderText={item.type}
                        >
                          <View
                            style={tw`w-15 h-10  border border-[${color[selectedRecipient].border}] rounded-lg items-center bg-[${color[selectedRecipient].background}]`}
                          >
                            <IconButton
                              size={10}
                              style={tw`m-0 `}
                              icon="briefcase"
                              onPress={() => {}}
                            ></IconButton>
                            <Text style={tw`text-[10px] `}>Title</Text>
                          </View>
                        </Draggable>
                      );
                    })}
                </View>
              );
            }}
          /> */}
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
        <View style={tw`flex-row  bg-white  items-center justify-between`}>
          <View style={tw`flex-row`}>
            <TouchableOpacity>
              <IconButton
                icon="chevron-down"
                onPress={() => {
                  carousel.current?.goToPage(index + 1, true);
                }}
              ></IconButton>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconButton
                icon="chevron-up"
                onPress={() => {
                  carousel.current?.goToPage(index - 1, true);
                }}
              ></IconButton>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row `}>
            <TouchableOpacity>
              <IconButton icon="magnify" onPress={() => {}}></IconButton>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconButton icon="dots-horizontal" onPress={() => {}}></IconButton>
            </TouchableOpacity>
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
