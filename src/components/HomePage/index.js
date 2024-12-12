import { documentToReactComponents } from '@contentful/rich-text-react-renderer';  // Import for rendering RichText

const Home = ({homePage}) =>{
  console.log(homePage?.fields?.titleList);
  console.log(homePage?.fields?.titleApperance);
  return(  
        <div>
            <h1 id='homePageTitle' className="title">{homePage?.fields?.homePageTitle}</h1>
            <div id='homePagedescription' className="description">
                {documentToReactComponents(homePage?.fields?.homePageDescription)}
            </div>
            {homePage?.fields?.titleList?.map((list) => (
              <p key={list?.sys?.space?.id}>{list}</p>
            )
            )}
        </div>)
};

export default Home;
