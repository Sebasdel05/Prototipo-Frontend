export interface DigitalService {
  id: number;
  name: string;
  category: 'Tecnologia' | 'Marketing' | 'Educacion' | 'Diseno' | 'Seguridad';
  shortDescription: string;
  description: string;
  image: string;
  rating: number;
  featured?: boolean;
  custom?: boolean;
  benefits: string[];
}
