import { formatDistanceToNow} from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow  = (date: number) => {
    const fronNow = formatDistanceToNow (date, {locale: es});

    return `Hace ${fronNow}`;
}
