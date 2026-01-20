import University from "@/assets/university.png"
const PartnerShowcase = () => {
  // Sample partner logos - replace with your actual partner logos
  const partners = [

    { name: "Partner 1", logo: "https://cdn.prod.website-files.com/65cd3eef566e705393bb192e/65cd3fdbcba8364ff2c0cb61_SEA%20Bridge.png" },
    { name: "Partner 2", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpaeCJZIBu6Gft1n7ka-lScQS5HoUQodlNlQ&s" },
  ];

    const countries = [
    { name: "Thailand", flag: "https://flagcdn.com/w320/th.png" },
    { name: "Laos", flag: "https://flagcdn.com/w320/la.png" },
    { name: "Vietnam", flag: "https://flagcdn.com/w320/vn.png" },
    { name: "Brunei", flag: "https://flagcdn.com/w320/bn.png" },
  ];


  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading organizations to create opportunities
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="flex justify-center items-center gap-12 mb-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white rounded-2xl p-8 "
              style={{ minWidth: '320px', height: '160px' }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain  transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
               {/* Countries Section */}
        <div className="mb-20">
   
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {countries.map((country, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white hover:scale-110 transition-transform duration-300">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{country.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Universities Section */}
        <div className="mb-20">
      
          <img src={University} alt="" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:shadow-lg transition-shadow">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
              4
            </div>
            <p className="text-sm text-muted-foreground font-medium">Countries</p>
          </div>
          <div className="text-center space-y-2 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:shadow-lg transition-shadow">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
              12
            </div>
            <p className="text-sm text-muted-foreground font-medium">Universities</p>
          </div>
          <div className="text-center space-y-2 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover:shadow-lg transition-shadow">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
              1000+
            </div>
            <p className="text-sm text-muted-foreground font-medium">Students</p>
          </div>
          
        </div>

        
      </div>
    </section>
  );
};

export default PartnerShowcase;