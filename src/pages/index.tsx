import React from 'react';
import Counter from '@/components/Counter';
import TsCounter from '@/components/TsCounter';

export default function() {
  const now = new Date();
  return (
    <div>
      <Counter now={now} />
      <TsCounter now={now} />
    </div>
  );
}
