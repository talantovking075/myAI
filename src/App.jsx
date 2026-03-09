import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InputArea from './components/InputArea/InputArea';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Salom! Men Gokki AI man.' }
  ]);
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatHistory] = useState([{ id: 1, title: "Gokki AI suhbati" }]);
  loading && setTimeout(() => setLoading(false), 1000);
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let aiText = "";

      if (lowerInput.includes('salom')) {
        aiText = "Assalomu alaykum! Ishlaringiz yaxshimi?";
      } else if (lowerInput.includes('isming') || lowerInput.includes('ismingiz')) {
        aiText = "Mening ismim Gokki AI, sizniki nima?";
      } else if (lowerInput.includes('qale') || lowerInput.includes('qalesan')) {
        aiText = "Vapshe mazza, o'zingiz qalesiz?";
      } else if (lowerInput.includes('sher') || lowerInput.includes('sher etib ber')) {
        aiText = "Albatta! Mana sizga bir sher:\n\nDaryo oqadi, sohilga yetar,\nYulduzlar charaqlaydi, tun yoritadi.\nHayot bir sayohat, yo'l uzun va chiroyli,\nHar qadamda yangi hikoyalar boshlanadi.";
      } else if (lowerInput.includes('hazil') || lowerInput.includes('hazil qil')) {
        aiText = "Hazil qilishni yaxshi ko'raman! Qanday hazil eshitishni xohlaysiz? dasturchilar haqida yoki oddiy hazilmi?";
      } else if (lowerInput.includes('seni kim yaratgan') || lowerInput.includes('yaratuvching kim')) {
        aiText = `Mani yaratuvchim Talantov Behruz, 2026-yilda Gokki AI ni yaratgan. U zamonaviy texnologiyalarni qo'llab-quvvatlaydigan va foydalanuvchilarga interaktiv tajriba taqdim etadigan bir dasturchi. Gokki AI ning maqsadi - foydalanuvchilarga qulay va samarali suhbatlashish imkoniyatini yaratishdir. (Talantov Behruz haqida ko'proq ma'lumot olish uchun "Talantov Behruz" deb so'rang!)`;
      } else if (lowerInput.includes('talantov behruz') || lowerInput.includes('behruz haqida')) {
        aiText = `Talantov Behruz - zamonaviy dasturchi va Gokki AI ning yaratuvchisi. U 2026-yilda Gokki AI ni yaratgan va foydalanuvchilarga interaktiv suhbatlashish imkoniyatini taqdim etgan. Behruz, o'zining texnologik bilimlari va ijodkorligi bilan tanilgan, va u doimo yangi texnologiyalarni o'rganishga intiladi. Uning maqsadi - foydalanuvchilarga qulay va samarali suhbatlashish tajribasini yaratishdir. Behruz 2010 - yil 15-avgustda tug‘ilgan, dasturlashga bo‘lgan qiziqishi yoshligidan boshlangan. U o‘zining dasturchilik faoliyatida ko‘plab loyihalarni amalga oshirgan va doimo yangi texnologiyalarni o‘rganishga intiladi. Behruz, Gokki AI ni yaratish orqali, foydalanuvchilarga interaktiv va qulay suhbatlashish imkoniyatini taqdim etishni maqsad qilgan. Buni u 2026-yil 15yoshida amalga oshirgan. Behruz, o'zining texnologik bilimlari va ijodkorligi bilan tanilgan, va u doimo yangi texnologiyalarni o'rganishga intiladi. Uning maqsadi - foydalanuvchilarga qulay va samarali suhbatlashish tajribasini yaratishdir. (siz 15 yoshingizda nima qildingiz? Talantov Behruz 15 yoshida Gokki AI ni yaratdi! 🤣)`;
      } else if (lowerInput.includes('dasturchilar haqida') || lowerInput.includes('dasturchilarniki')) {
        aiText = `Bir dasturchi do‘kon ochibdi. Do‘koniga birinchi mijoz kirib kelib so‘rabdi:
— Kechirasiz, sizda non bormi?
Dasturchi javob beribdi:
— Yo‘q, bizda non yo‘q, lekin noni bor obyektni qidirish funksiyasi bor. Agar xohlasangiz, qidiruv tizimini yangilashim mumkin!
Mijoz hayron bo‘lib:
— Noni bor narsani ko‘rsating-chi? — debdi.
Dasturchi:
— Hozir, non_topish.exe ni ishga tushiraman... bir daqiqa... kuting... Error 404: Non topilmadi. Lekin xavotir olmang, kodda biroz o‘zgarish kiritamiz, ertaga kelasiz, balki chiqib qolar!`;
      } else {
        aiText = `"${input}" haqida hali ma'lumotim yo'q, lekin o'rganib olaman!`;
      }
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 800);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          chatHistory={chatHistory}
          onNewChat={() => setMessages([])}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}

        <main className="main-content">
          <header className="chat-header"><h1 className='chat-title'>Gokki AI</h1></header>

          <Routes>
            {/* Asosiy chat yo'li */}
            <Route path="/" element={
              <>
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
              </>
            } />

            {/* Chat ID bilan yo'l */}
            <Route path="/chat/:id" element={
              <>
                <ChatWindow messages={messages} />
                <InputArea input={input} setInput={setInput} onSend={handleSend} />
              </>
            } />

            {/* About sahifasi yo'li */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;