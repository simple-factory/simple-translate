import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const languages = [
    { label: '한국어', value: 'kr' },
    { label: '영어', value: 'en' },
    { label: '일본어', value: 'jp' },
    { label: '중국어', value: 'cn' },
    { label: '베트남어', value: 'vi' },
    { label: '인도네시아어', value: 'id' }
];

class Translate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: '번역할 내용을 입력해주세요.',
            text: '',
            result: '',
            src_lang: {
                label: '영어', value: 'en'
            },
            target_lang: {
                label: '한국어', value: 'kr'
            }
        };
    }

    onPressTranslate() {
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
            src_lang: this.state.src_lang.value,
            target_lang: this.state.target_lang.value
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

    onPressSrcLang(value) {
        let changeLang = 'kr';

        if (value === changeLang) {
            changeLang = this.state.src_lang.value;
        }
        this.onChangeTargetLang(changeLang);

        this.onChangeSrcLang(value);
    }

    onChangeSrcLang(value) {
        const src_lang = languages.find((l) => {
            return l.value === value;
        });

        this.setState({
            src_lang
        });
    }

    onPressTargetLang(value) {
        let changeLang = 'kr';

        if (value === changeLang) {
            changeLang = this.state.target_lang.value;
        }
        this.onChangeSrcLang(changeLang);

        this.onChangeTargetLang(value);
    }

    onChangeTargetLang(value) {
        const target_lang = languages.find((l) => {
            return l.value === value;
        });

        this.setState({
            target_lang
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.title}>Simple Translate</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.language}>
                        <Dropdown
                            style={styles.dropdown}
                            value={this.state.src_lang.label}
                            onChangeText={this.onPressSrcLang.bind(this)}
                            data={languages}
                        />
                        <Dropdown
                            style={styles.dropdown}
                            value={this.state.target_lang.label}
                            onChangeText={this.onPressTargetLang.bind(this)}
                            data={languages}
                        />
                    </View>
                    <TextInput
                            style={styles.translate_field}
                            multiline={true}
                            placeholder={this.state.placeholder}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    <TouchableHighlight
                        onPressIn={this.onPressTranslate.bind(this)}
                    >
                        <View style={styles.button}>
                            <Text style={styles.txt}>번역</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.result}>{this.state.result}</Text>
                </View>
            </View>
        );
    }
}

const colors = {
    yellow: '#FFDC00',
    bg: '#3b3b3b'
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        backgroundColor: colors.bg
    },
    txt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },
    screen: {
        flex: 1,
        backgroundColor: colors.yellow,
        marginTop: 30
    },
    container: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 8,
        paddingHorizontal: 8
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
    language: {
        flexDirection: 'row'
    },
    dropdown: {
        flex: 0,
        width: '50%'
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