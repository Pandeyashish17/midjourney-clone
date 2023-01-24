import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import FileSaver from "file-saver";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function Page() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const shareButtons = [
    {
      button: FacebookShareButton,
      icon: FacebookIcon,
    },
    {
      button: TwitterShareButton,
      icon: TwitterIcon,
    },
    {
      button: LinkedinShareButton,
      icon: LinkedinIcon,
    },
    {
      button: PinterestShareButton,
      icon: PinterestIcon,
    },
    {
      button: RedditShareButton,
      icon: RedditIcon,
    },
    {
      button: TelegramShareButton,
      icon: TelegramIcon,
    },
    {
      button: WhatsappShareButton,
      icon: WhatsappIcon,
    },
    {
      button: EmailShareButton,
      icon: EmailIcon,
    },
  ];
  useEffect(() => {
    fetchData("A Man Kissing the dog");
  }, []);

  const SaveImage = (url: String) => {
    FileSaver.saveAs(`${url}`, "image.jpg");
  };
  async function fetchData(ImageToSearch: String) {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer OPEN_AI_API_KEY",
        },
        body: JSON.stringify({
          prompt: ImageToSearch,
          n: 4,
          size: "1024x1024",
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonResponse = await res.json();
      setUrls([...jsonResponse.data.map((image: any) => image.url), ...urls]);
    } catch (err) {
      setError(err as Error);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center w-[100vw] flex-col pt-3 gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 text-black outline-dashed"
      />
      <button
        onClick={() => fetchData(query)}
        className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          Fetch Data
        </span>
      </button>
      <button
        onClick={() => setUrls([])}
        className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          Clear
        </span>
      </button>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
        {urls.map((url, index) => (
          <figure className="hover-img cursor-pointer">
            <Image
              width={300}
              height={200}
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
            />{" "}
            <figcaption className="flex flex-col gap-2">
              <div className="flex gap-1">
                {shareButtons.map((item) => (
                  <button>
                    <item.button url={url} media={url}>
                      <item.icon size={28} round={true} />
                    </item.button>
                  </button>
                ))}
              </div>
              <div>
                <button onClick={() => SaveImage(url)}>Download</button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
