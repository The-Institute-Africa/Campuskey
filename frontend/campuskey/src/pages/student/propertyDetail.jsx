import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyById} from './api/student.api';
import { useAuth } from './api/index';

export default function PropertyDetail() {
   const [propertyDetail,setPropertyDetail] = useState(null);
    const { slug } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const loadPropertyData = async (slug,user) => {
          try {
            const fetchedProperty = await fetchPropertyById(slug,user?.token);
            setPropertyDetail(fetchedProperty);
          } catch (err) {
            console.error('Error fetching property data:', err);
          }
        };

        loadPropertyData(slug,user);
      }, [slug]);

      if (!propertyDetail) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
      }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Property Detail Page</h1>
      <p>{propertyDetail.slug}</p>
    </div>
  );
}