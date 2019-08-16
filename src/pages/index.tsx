import React from 'react';
import Counter from '@/components/Counter';

export default function() {
  const now = new Date();
  return (
    <div>
      <Counter now={now} />
    </div>
  );
}
