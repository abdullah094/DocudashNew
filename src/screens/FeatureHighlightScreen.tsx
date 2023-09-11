import { AccessibilityInfo, findNodeHandle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { FeatureHighlight, Typography, View, Text, Button, Colors } from 'react-native-ui-lib';

const titles = [
  'Get Notified',
  'Title two is a long title that will not get cut by default, but can be limited',
  'Title number three',
  'Title number four',
  'Title number five',
  'Welcome to Uilib demo!',
];
const messages = [
  'Important notifications appear right on your clubs and groups. Tap them to get more information about the most' +
    'important things that you should pay attention to.',
  'Short message with information about the above highlighted feature',
  'A long message, that will not get cut (but can be limited) with information about the highlighted feature.' +
    ' Please note that if the message is too long and will cause the content box to render off screen, you will get a' +
    ' warning about it',
  'Very short message',
  'Short message with information about the below highlighted feature',
  'Here is where you can view demos of all Uilib components',
];

interface State {
  currentTargetIndex: number;
  showFTE: boolean;
}

export default function FeatureHighlightScreen() {
  const viewRef = useRef(null);
  const [targets, setTargets] = useState<{ [key: string]: any }>({});
  const [state, setState] = useState({
    showFTE: false,
    currentTargetIndex: 0,
  });
  useEffect(() => {
    setTimeout(() => {
      showHighlight();
    }, 1000);
  }, []);

  const closeHighlight = () => {
    setState((prev) => ({ ...prev, showFTE: false }));
    () => {
      if (viewRef.current) {
        const reactTag = findNodeHandle(viewRef.current);
        reactTag && AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    };
  };

  const showHighlight = () => {
    setState((prev) => ({ ...prev, showFTE: true }));
  };

  const addTarget = (ref: any, id: string) => {
    if (ref && !targets[id]) {
      targets[id] = ref;
    }
  };
  const moveNext = () => {
    const { currentTargetIndex } = state;
    const newTargetIndex = currentTargetIndex + 1;

    moveToPage(newTargetIndex);
  };

  const moveToPage = (index: number) => {
    if (index < _.size(targets)) {
      setState((prev) => ({ ...prev, currentTargetIndex: index }));
    } else {
      closeHighlight();
    }
  };

  const getPageControlProps = () => {
    return {
      numOfPages: titles.length,
      currentPage: state.currentTargetIndex,
      onPagePress: onPagePress,
      color: Colors.grey30,
      inactiveColor: Colors.grey80,
      size: 8,
    };
  };

  const onPagePress = (index: number) => {
    moveToPage(index);
  };

  const renderHighlighterOverlay = () => {
    const { showFTE, currentTargetIndex } = state;
    const lastPage = titles.length - 1;

    return (
      <FeatureHighlight
        visible={showFTE}
        title={titles[currentTargetIndex]}
        message={messages[currentTargetIndex]}
        titleStyle={currentTargetIndex === lastPage ? { ...Typography.text70 } : undefined}
        messageStyle={
          currentTargetIndex === lastPage
            ? { ...Typography.text60, fontWeight: '900', lineHeight: 28 }
            : undefined
        }
        confirmButtonProps={{ label: 'Got It', onPress: moveNext }}
        onBackgroundPress={closeHighlight}
        getTarget={() => targets[currentTargetIndex]}
        // highlightFrame={{x: 30, y: 70, width: 150, height: 30}}
        // highlightFrame={{x: 160, y: 336, width: 150, height: 56}}
        borderRadius={_.includes([1, 2, 3, 4], currentTargetIndex) ? 4 : undefined}
        pageControlProps={currentTargetIndex < lastPage ? getPageControlProps() : undefined}
      />
    );
  };

  return (
    <View flex>
      <View row flex>
        <View left>
          <View
            marginT-40
            br100
            bg-yellow10
            style={{ width: 32, height: 32 }}
            testID={'0'}
            ref={(r) => addTarget(r, '0')}
          />
          <View
            marginT-40
            bg-red10
            style={{ width: 12, height: 12 }}
            testID={'1'}
            ref={(r) => addTarget(r, '1')}
          />
        </View>
        <View right flex>
          <View row flex>
            <View
              marginT-40
              marginR-60
              bg-cyan30
              style={{ width: 50, height: 70 }}
              testID={'2'}
              ref={(r) => addTarget(r, '2')}
            />
            <View
              marginT-40
              bg-violet30
              style={{ width: 70, height: 50 }}
              testID={'3'}
              ref={(r) => addTarget(r, '3')}
            />
          </View>
          <View
            marginT-40
            marginR-50
            bg-purple40
            style={{ width: 150, height: 56 }}
            testID={'4'}
            ref={(r) => addTarget(r, '4')}
          />
        </View>
      </View>
      <View center padding-25>
        <View ref={viewRef}>
          <Text marginT-20>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,{' '}
            <Text>remaining</Text> essentially unchanged.
          </Text>
        </View>
        <View marginT-20 testID={'5'} ref={(r) => addTarget(r, '5')}>
          <Button label="Show Overlay" onPress={showHighlight} />
        </View>
      </View>
      {renderHighlighterOverlay()}
    </View>
  );
}
