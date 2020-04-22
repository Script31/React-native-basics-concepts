import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then(response => {
      console.log(response.data);

      setProjects(response.data);
    });
  }, []);

  async function handleProject() {
    const response = await api.post("projects", {
      title: `react nartive core ${Date.now()}`,
      owner: "elves trindade"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
      </SafeAreaView>
      {/* <View style={styles.conatiner}>
        {projects.map(project => (
          <Text style={styles.title} key={project.id}>
            {project.title}
          </Text>
        ))}
      </View> */}

      <TouchableOpacity styles={styles.button} onPress={handleProject}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1"
  },
  title: {
    fontSize: 10,
    color: "#fff"
  },
  button: {
    margin: 20,
    height: 50,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#7159c1",
    fontSize: 20
  }
});
