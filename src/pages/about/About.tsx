import "./about.css";
import BlogComponent from "../../components/blogC/BlogComponent";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../DataContext";

interface Lang {
  text: string;
  title: string;
  img: string;
  h2: string;
  p1: string;
  p2: string;
}

function About() {
  const [lang, setLang] = useState<Lang>({
    title: "",
    text: "",
    img: "",
    h2: "",
    p1: "",
    p2: "",
  });
  const contextValue = useContext(DataContext);
  if (!contextValue) {
    return <div>Loading...</div>;
  }
  const { language } = contextValue;

  useEffect(() => {
    if (language.uzb) {
      setLang({
        title: "#Biz Haqmizda",
        text: "Volidam travel sayohat agentlig",
        img: "about-bg",
        h2: "Biz Kimmiz",
        p1: `Volidam Sayohat Agentligiga Xush kelibsiz!

Volidam Sayohat Agentligi sifatida, biz mijozlarimiz uchun unutulmaz sayohat tajribalari yaratishga qiziqaymiz. Yangi va dinamik sayohat agentligi sifatida, bizning maqsadimiz O'zbekistonning hayratlanadigan yo'llarini va boshqa chiroyli va mashhur mamlakatlarni o'rganishingizga yordam berishdir.`,
        p2: `Bizning jamoamiz ishtirokchilar bir qator sayohat hayratparastlardan iborat, ular sizning xususiy talablaringiz va qiziqishlaringizga mos xizmat qiluvchi mo'ljallangan marşrutlar yaratishda yaxshi tushunadi. Siz O'zbekistonning qadimiy shaharlarida madaniy bog'lanish, hayratlanarli manzaralar bilan sog'inchli yurish, yoki troplik qirg'izmasidan dengiz pljajiga o'tishni izlayotsizmi - bizning daftarchamizda hech qachon yo'q.

Tafsilotlariga to'g'ri e'tibor berish va sifatga bo'lgan ta'commit bilan, biz har bir sayohatingizning har bir qismiga qayg'ilanishni ta'minlaymiz, sizni bir oz qayg'usiz sayohatga qo'yishimizni ta'minlaymiz. Parvoz qilish va joylashtirishdan, mahalliy turlar va tajriba tadbirlarini tashkil qilishgacha - biz hepsini boshqarib, sizga har bir kundalik e'tiroz va bezak xotiralar yaratishga vaqtingizni beramiz.`,
      });
    } else if (language.eng) {
      setLang({
        title: "#About Us",
        text: "Volidam Travel Agency",
        img: "about-bg",
        h2: "Who We Are",
        p1: `Welcome to Volidam Travel Agency!

At Volidam Travel Agency, we are passionate about creating unforgettable travel experiences for our clients. As a new and dynamic travel agency, our mission is to open up a world of possibilities for you, helping you explore the wonders of Uzbekistan and other beautiful and famous countries.`,
        p2: `Our team is composed of seasoned travel enthusiasts who are well-versed in crafting tailor-made itineraries that cater to your unique preferences and interests. Whether you're seeking a cultural immersion in the ancient cities of Uzbekistan, an adventurous trek through breathtaking landscapes, or a serene beach escape to a tropical paradise, we've got you covered.

With a keen eye for detail and a commitment to quality, we take care of every aspect of your journey, ensuring that you can fully immerse yourself in the adventure without any worries. From booking flights and accommodations to organizing local tours and experiences, we handle it all, leaving you free to savor each moment and create cherished memories.`,
      });
    } else {
      setLang({
        title: "#О нас",
        text: "Турагентство Волидам",
        img: "about-bg",
        h2: "Кто Mы",
        p1: `Добро пожаловать в туристическое агентство "Volidam"!

В агентстве "Volidam" мы с увлечением создаем незабываемые путешествия для наших клиентов. Как новое и динамичное агентство, наша миссия - открыть перед вами мир возможностей, помогая исследовать чудеса Узбекистана и других красивых и знаменитых стран.`,
        p2: `Наша команда состоит из опытных энтузиастов путешествий, хорошо разбирающихся в создании индивидуальных маршрутов, которые учитывают ваши уникальные предпочтения и интересы. Независимо от того, ищете ли вы культурное погружение в древних городах Узбекистана, приключенческий поход по захватывающим пейзажам или спокойный отдых на пляже в тропическом раю, у нас все есть.

Обладая зорким глазом к деталям и приверженностью к качеству, мы берем на себя заботу обо всех аспектах вашего путешествия, обеспечивая полное погружение в приключение без всяких забот. От бронирования авиабилетов и размещения до организации местных экскурсий и впечатлений - мы берем все на себя, оставляя вам возможность наслаждаться каждым моментом и создавать драгоценные воспоминания.`,
      });
    }
  }, [language]);

  return (
    <>
      <BlogComponent title={lang.title} text={lang.text} img={lang.img} />
      <section id="about-head">
        <img
          src="https://res.cloudinary.com/dmu4nnfdg/image/upload/v1689941264/photo_2023-07-20_18-58-45_xzqrie.jpg"
          alt="Volidam Travel Agancy"
        />
        <div>
          <h2>{lang.h2}</h2>
          <p>{lang.p1}</p>
          <p>{lang.p2}</p>
        </div>
      </section>
    </>
  );
}

export default About;
