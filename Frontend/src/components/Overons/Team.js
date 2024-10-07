// TeamComponent.js
import React from 'react';
import Abdelaziz from '../../assets/team/AbdelAziz_Ahemmar_Laassarafoundation.nl_Voorzitter 1.png';
import Moussa from '../../assets/team/Moussa_Ahemmar_Laassarafoundation.nl_Pennigmeester 1.png';
import Abdelhakim from '../../assets/team/Hakim_Koubaa_Laassarafoundation.nl_ 1.png';
import Moustapha from '../../assets/team/Moustapha_El_Founti_Laassarafoundation.nl_ 1.png';
import Ilias from '../../assets/team/Ilias_El_Founti_Laassarafoundation.nl_ 1.png';



const Teammembers = () => {
    const teamMembers = [
        {
          name: "Moussa Ahammar",
          position: "Penningmeester",
          image: Moussa,
        },
        {
          name: "Abdelaziz Ahammar",
          position: "Voorzitter",
          image: Abdelaziz,
        },
        {
          name: "Abdelhakim Koubaa",
          position: "2de penningmeester",
          image: Abdelhakim,
        },
        {
          name: "Moustapha El Founti",
          position: "Secretaris",
          image:  Moustapha,
        },
        {
          name: "Ilias El Founti",
          position: "Vice voorzitter",
          image: Ilias,
        },
      ];
      
  return (
    <div className="flex flex-col items-center py-12 bg-transparent">
      <h2 className="text-3xl font-bold text-center mb-8">
        Ons <span className="text-softBlue">team</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-32">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-3xl bg-none shadow-lg"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teammembers;
