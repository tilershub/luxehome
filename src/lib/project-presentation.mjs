/** Remove obsolete publishing notes while retaining recorded construction facts. */
export function publicProjectStory(story) {
  if (!story) return story;
  return story
    .replace(/ This bathroom was previously shown[^.]*\./g, '')
    .replace(/ It is now presented under its real project identity\./g, '')
    .replace(/ The detailed scope, investment, testing record and handover notes will be added from the original project file\./g, '')
    .replace(/ The two finished bathrooms were previously shown[^.]*\./g, '')
    .replace(/ Both bathrooms now belong to this single real project story\./g, '');
}
