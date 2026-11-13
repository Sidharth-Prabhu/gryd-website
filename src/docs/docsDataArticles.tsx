import React from 'react';
import { gettingStartedArticles } from './articles/gettingStartedArticles';
import { configurationArticles } from './articles/configurationArticles';
import { cliReferenceArticles } from './articles/cliReferenceArticles';
import { tuiManualArticles } from './articles/tuiManualArticles';
import { recipesAndCiArticles } from './articles/recipesAndCiArticles';

export const DOC_ARTICLES: Record<string, {
  title: string;
  category: string;
  description: string;
  render: () => React.ReactNode;
}> = {
  ...gettingStartedArticles,
  ...configurationArticles,
  ...cliReferenceArticles,
  ...tuiManualArticles,
  ...recipesAndCiArticles,
};
