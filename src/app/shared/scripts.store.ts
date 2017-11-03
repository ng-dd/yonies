interface Scripts{
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {name: 'youtube', src: 'https://www.youtube.com/iframe_api'},
  {name: 'twitterWidget', src: 'https://platform.twitter.com/widgets.js'},
  {name: 'anime', src: 'anime.min.js'}
]