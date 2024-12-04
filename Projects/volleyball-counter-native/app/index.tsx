import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Counter: React.FC = () => {
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [time, setTime] = useState<number>(30);
  const [playedSets, setPlayedSets] = useState<
    Array<{ home: number; away: number }>
  >([]);
  const timeRef = useRef(null);

  const homeScoreUp = () => setHomeScore(homeScore + 1);
  const homeScoreDown = () => homeScore > 0 && setHomeScore(homeScore - 1);
  const awayScoreUp = () => setAwayScore(awayScore + 1);
  const awayScoreDown = () => awayScore > 0 && setAwayScore(awayScore - 1);

  const startTimeout = () => {
    let countdownTime = 30;
    setTime(countdownTime);

    const interval = setInterval(() => {
      countdownTime--;
      setTime(countdownTime);
      if (countdownTime === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const nextSet = () => {
    if (playedSets.length < 5) {
      setPlayedSets([...playedSets, { home: homeScore, away: awayScore }]);
      setHomeScore(0);
      setAwayScore(0);
    }
  };

  const removeSet = () => {
    const newSets = [...playedSets];
    newSets.pop();
    setPlayedSets(newSets);
  };

  const reset = () => {
    setHomeScore(0);
    setAwayScore(0);
    setPlayedSets([]);
    setTime(30);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sets</Text>
      <FlatList
        data={playedSets}
        renderItem={({ item, index }) => (
          <Text key={index} style={styles.setItem}>
            {item.home} - {item.away}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
      />

      <Text style={styles.title}>Scores</Text>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Home</Text>
          <Text style={styles.score}>{homeScore}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={homeScoreUp}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={homeScoreDown}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Away</Text>
          <Text style={styles.score}>{awayScore}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={awayScoreUp}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={awayScoreDown}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.mainButton} onPress={startTimeout}>
          <Text style={styles.mainButtonText}>Timeout</Text>
        </TouchableOpacity>
        <Text style={styles.timer}>{time}</Text>
        <TouchableOpacity style={styles.mainButton} onPress={nextSet}>
          <Text style={styles.mainButtonText}>Next Set</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton} onPress={removeSet}>
          <Text style={styles.mainButtonText}>Remove Latest Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mainButton, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.mainButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Made with ❤️ by Lennert Van Geert</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  flatList: {
    flexGrow: 0, // Allows the list to expand based on its content
    minHeight: 100,
  },
  flatListContainer: {
    justifyContent: "center",
  },
  setItem: {
    fontSize: 18,
    textAlign: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  scoreBox: {
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  score: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  controls: {
    alignItems: "center",
    marginVertical: 10,
  },
  mainButton: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#ff0000",
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  footer: {
    textAlign: "center",
    marginVertical: 10,
  },
});

export default Counter;
