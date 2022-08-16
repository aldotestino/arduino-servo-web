import React from 'react';

interface ServoProps {
  deg: number
}

function Servo({ deg }: ServoProps) {

  return (
    <svg width="320" height="120" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* BASE */}
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H320V51.8878C316.82 45.4375 310.178 41 302.5 41C291.73 41 283 49.7304 283 60.5C283 71.2696 291.73 80 302.5 80C310.178 80 316.82 75.5625 320 69.1122V120H0V69.1122C3.18039 75.5625 9.82198 80 17.5 80C28.2696 80 37 71.2696 37 60.5C37 49.7304 28.2696 41 17.5 41C9.82198 41 3.18039 45.4375 0 51.8878V0Z" fill="#0094FF"/>
      <circle cx="100" cy="60" r="44" fill="#0075FF"/>
      <circle cx="144" cy="60" r="29" fill="#0075FF"/>
      {/* ROTATOR */}
      <g transform={`rotate(${180-deg} 100.018 59.9712)`}>
        <circle cx="100.018" cy="59.9712" r="22" fill="#D9D9D9"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M100.018 59.9712L114.018 42.9712C114.018 42.9712 238.518 47.4711 238.518 59.9711C238.518 72.471 114.018 76.9712 114.018 76.9712L100.018 59.9712ZM224.018 55.9795C226.227 55.9795 228.018 57.7704 228.018 59.9795C228.018 62.1887 226.227 63.9795 224.018 63.9795C221.808 63.9795 220.018 62.1887 220.018 59.9795C220.018 57.7704 221.808 55.9795 224.018 55.9795ZM210.018 59.9796C210.018 57.7704 208.227 55.9796 206.018 55.9796C203.808 55.9796 202.018 57.7704 202.018 59.9796C202.018 62.1887 203.808 63.9796 206.018 63.9796C208.227 63.9796 210.018 62.1887 210.018 59.9796ZM188.018 55.9796C190.227 55.9796 192.018 57.7704 192.018 59.9796C192.018 62.1887 190.227 63.9796 188.018 63.9796C185.808 63.9796 184.018 62.1887 184.018 59.9796C184.018 57.7704 185.808 55.9796 188.018 55.9796ZM174.018 59.9796C174.018 57.7705 172.227 55.9796 170.018 55.9796C167.808 55.9796 166.018 57.7705 166.018 59.9796C166.018 62.1887 167.808 63.9796 170.018 63.9796C172.227 63.9796 174.018 62.1887 174.018 59.9796ZM152.018 55.9796C154.227 55.9796 156.018 57.7705 156.018 59.9796C156.018 62.1888 154.227 63.9796 152.018 63.9796C149.808 63.9796 148.018 62.1888 148.018 59.9796C148.018 57.7705 149.808 55.9796 152.018 55.9796ZM138.018 59.9796C138.018 57.7705 136.227 55.9796 134.018 55.9796C131.808 55.9796 130.018 57.7705 130.018 59.9796C130.018 62.1888 131.808 63.9796 134.018 63.9796C136.227 63.9796 138.018 62.1888 138.018 59.9796Z" fill="#D9D9D9"/>
      </g>
    </svg>
  );
}

export default Servo;