console.log("Hello from client.js");

const placeholderList = ["検索したいものを入力してください。", "映画見るのもええがな", "今日の気分は何だろう", "大音響っていいよね", "シネマ", "話題の新作を見ようかな？", "もう一回あの作品を見ようかな？", "What movie do you want to see?", "暇なら映画でも?", "ボッチ映画はいかが？", "大切な人とのひとときを。", "そうだ、映画を観よう", "恋人はいなくても恋愛映画が見たい！", "あのアニメ映画はどこでやってるのかな", "オタクに恋は難しい！お前に恋は難しい！", "笑いあり、涙あり、そんな世界もいいよね", "上映中に寝るなよぉ～", "＊ラッキー！このメッセージをみたからきょうはいいひだ", "検索窓", '<form class="search" method="get">', "何やってるんですか、映画を観てください！！", "ネタ切れ"]
const searchPlaceholder = document.getElementById("sbox");
searchPlaceholder.placeholder = placeholderList[Math.floor(Math.random() * placeholderList.length)];