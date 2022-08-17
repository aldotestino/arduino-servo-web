import React from 'react';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Tooltip } from '@chakra-ui/react';

interface ServSliderProps {
  onChange: (val: number) => void
  onChangeEnd: (val: number) => void
  defaultValue: number
  deg: number
  isLocked: boolean
}

function ServoSlider({ onChange, onChangeEnd, defaultValue, deg, isLocked }: ServSliderProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  return (
    <Slider
      isDisabled={isLocked}
      width="sm"
      aria-label='slider' 
      min={0} 
      max={180} 
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      defaultValue={defaultValue}
      value={deg}
    >
      <SliderMark value={0} mt='1' ml='-2.5' fontSize='lg'>
        0°
      </SliderMark>
      <SliderMark value={45} mt='1' ml='-2.5' fontSize='lg'>
        45°
      </SliderMark>
      <SliderMark value={90} mt='1' ml='-2.5' fontSize='lg'>
        90°
      </SliderMark>
      <SliderMark value={135} mt='1' ml='-2.5' fontSize='lg'>
        135°
      </SliderMark>
      <SliderMark value={180} mt='1' ml='-2.5' fontSize='lg'>
        180°
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        color='white'
        placement='top'
        fontSize="lg"
        isOpen={showTooltip}
        label={`${deg}°`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default ServoSlider;