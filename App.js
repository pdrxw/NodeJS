import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [acertos, setAcertos] = useState(null);

  const handleAdd = () => {
    const num = parseInt(input);

    if (numbers.length >= 6) {
      alert('Você só pode inserir até 6 números.');
      return;
    }

    if (!isNaN(num) && num >= 1 && num <= 60) {
      if (numbers.includes(num)) {
        alert('Esse número já foi inserido!');
        return;
      }
      setNumbers([...numbers, num]);
      setInput('');
    } else {
      alert('Digite um número entre 1 e 60');
    }
  };

  const sortearNumeros = () => {
    const sorteados = [];
    while (sorteados.length < 6) {
      const numero = Math.floor(Math.random() * 60) + 1;
      if (!sorteados.includes(numero)) {
        sorteados.push(numero);
      }
    }

    setRandomNumbers(sorteados);

    const acertosTotal = numbers.filter((n) => sorteados.includes(n)).length;
    setAcertos(acertosTotal);
  };

  const resetarJogo = () => {
    setInput('');
    setNumbers([]);
    setRandomNumbers([]);
    setAcertos(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Mega-Sena Online</Text>

      {numbers.length < 6 && (
        <>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Digite um número (1 a 60)"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.botao}
            onPress={handleAdd}
          >
            <Text style={styles.botaoText}>Inserir</Text>
          </TouchableOpacity>
        </>
      )}

      {numbers.length === 6 && randomNumbers.length === 0 && (
        <TouchableOpacity
          style={styles.botao}
          onPress={sortearNumeros}
        >
          <Text style={styles.botaoText}>Sortear</Text>
        </TouchableOpacity>
      )}

      {randomNumbers.length > 0 && (
        <>
          <Text style={styles.resultText}>Números Sorteados:</Text>
          <View style={styles.list}>
            {randomNumbers.map((num, index) => (
              <Text
                key={index}
                style={styles.numberSorteio}
              >
                {num}
              </Text>
            ))}
          </View>

          <Text style={styles.resultText}>Você acertou {acertos} número(s)!</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={resetarJogo}
          >
            <Text style={styles.botaoText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.resultText}>Seus números:</Text>
      <View style={styles.list}>
        {numbers.map((num, index) => (
          <Text
            key={index}
            style={[
              styles.number,
              randomNumbers.includes(num) && styles.numberAcerto
            ]}
          >
            {num}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2b2d42',
    padding: 16,
  },
  paragraph: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#edf2f4',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'center',
    color: '#2b2d42',
    backgroundColor: '#edf2f4',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    width: '55%',
  },
  botao: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    width: '40%',
    backgroundColor: '#d90429',
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  botaoText: {
    color: '#edf2f4',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 5,
  },
  number: {
    fontSize: 18,
    color: '#2b2d42',
    backgroundColor: '#edf2f4',
    padding: 8,
    borderRadius: 50,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  numberSorteio: {
    fontSize: 18,
    color: '#edf2f4',
    backgroundColor: '#d90429',
    padding: 8,
    borderRadius: 50,
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  numberAcerto: {
    backgroundColor: '#4caf50',
    color: '#edf2f4',
  },
  resultText: {
    fontSize: 18,
    color: '#edf2f4',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});
