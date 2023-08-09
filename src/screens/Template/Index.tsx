import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import tw from 'twrnc';

const Index = () => {
  const [time, setTime] = React.useState<{
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  }>({
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  function calculateTimeLeft() {
    const year = new Date().getFullYear();
    const difference = +new Date(`2023-09-01`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    setTimeout(() => {
      let timeLeft = calculateTimeLeft();
      setTime(timeLeft);
    }, 1000);
  }, [time]);

  return (
    <View style={tw`h-full justify-center items-center px-5`}>
      <Text variant="headlineMedium">
        Feature coming in {time.days} days
        {time.hours} hours {time.minutes} minutes {time.seconds} seconds
      </Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
