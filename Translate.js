import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';

class Translate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: '번역 할 내용을 적으세요.(한글)',
            text: '',
            result: ''
        };
    }

    onPressLearnMore() {
        if (this.state.text.length === 0) {
            this.setState({
                result: ''
            });
            return;
        }

        const url = 'https://kapi.kakao.com/v1/translation/translate';
        const APP_KEY = '7c756a3b40b18dd63237fe81cf1a9152';
        const headers = {
            'Authorization': `KakaoAK ${APP_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            query: this.state.text,
            src_lang: 'kr',
            target_lang: 'en'
        };

        const params = `?query=${data.query}&src_lang=${data.src_lang}&target_lang=${data.target_lang}`;
        
        fetch(`${url}${params}`, {
                method: 'get',
                headers
            })
            .then((response) => response.json())
            .then((responseJson) => {
                const result = responseJson.translated_text.map((r) => `${r[0]}`);
                
                this.setState({
                    result: result.join('\n')
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    result: `error: ${error}`
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Simple Translate</Text>
                </View>
                <View>
                    <Text>언어선택</Text>
                    <Text>언어선택</Text>
                </View>
                <TextInput
                        style={styles.translate_field}
                        multiline={true}
                        placeholder={this.state.placeholder}
                        onChange={this.onPressLearnMore.bind(this)}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                <Text style={styles.result}>{this.state.result}</Text>
            </View>
        );
    }
}

const colors = {
    yellow: '#FFDC00',
    bg: '#3b3b3b'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    header: {
        backgroundColor: colors.bg,
        justifyContent: 'center',
        width: '100%',
        padding: 10
    },
    title: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: 20
    },
    translate_field: {
        flex: 1,
        width: '100%',
        minHeight: 100,
        padding: 15,
        backgroundColor: 'white',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10
    },
    result: {
        flex: 1,
        width: '95%',
        minHeight: 100,
        padding: 15,
        margin: 10,
        backgroundColor: colors.bg,
        color: 'white',
        fontSize: 18
    }
});

export default Translate;