import Home from '@/components/HomePage';
import Hero from '../components/HeroBanner'; 
import client from '@/lib/contentful'; 

const Main = ({ homePage, heroBanner }) => {
  const { locale, asPath, push } = useRouter();
  const changeLanguage = (newLocale) => {
      push(asPath, asPath, { locale: newLocale });
    };
  return (
    <div className="container">
      <p>Current Language: {locale}</p>
      <button onClick={() => changeLanguage('en-US')}>English</button>
      <button onClick={() => changeLanguage('ar')}>Arabic</button>
      <Home homePage={homePage} />
      <Hero heroBanner={heroBanner} />
    </div>
  );
};

export async function getStaticProps( {locale} ) {
  try {

    const resHome = await client.getEntries({
      content_type: 'homePage',  
      locale,
    });

    const res = await client.getEntries({
      content_type: 'heroBanner',
      locale,
    });

    const homePage = resHome.items[0];
    const heroBanner = res.items[0]; 
    return {
      props: {
        homePage,
        heroBanner,
      },
    };
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    return {
      props: {
        homePage: null,
        heroBanner: null, 
      },
    };
  }
}

export default Main;
