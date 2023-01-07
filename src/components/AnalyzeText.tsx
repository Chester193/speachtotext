import React, { useEffect, useState } from 'react';
import { TextAnalyticsClient, AzureKeyCredential } from '@azure/ai-text-analytics';

import config from '../azureconfig.json'; // load config from file

interface Props {
  text: string;
}

const AnalyzeText: React.FC<Props> = ({ text }) => {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = new TextAnalyticsClient(
      config.AZURE_API_URI,
      new AzureKeyCredential(config.AZURE_API_KEY)
    );

    client
      .analyzeSentiment([text])
      .then(result => {
        const res = result[0];
        if(!res.error)
            setSentiment(res.sentiment);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [text]);

  if (error) {
    return <span>Error: {error}</span>;
  }

  return (
    <div>
      {sentiment ? (
        <p>
          Sentiment: {sentiment}
        </p>
      ) : (
        <p>Analyzing text...</p>
      )}
    </div>
  );
};

export default AnalyzeText;
