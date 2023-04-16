import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { Button } from '..';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackPageButton = () => {
  const router = useRouter();

  return (
    <Button type="button" color="text" shape="circle" onClick={router.back}>
      <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
    </Button>
  );
};

export default BackPageButton;
