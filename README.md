Crowd-sourcing mobile interface for collecting symptom information across communities. Information gathered is specific 
to viral infections, though at point of initial commit, is not configurable to different viruses, but is generalized, based 
on the most common syptoms of Covid-19.

Built with: 

React
React-native
React-native-maps
React-navigation
React-native-public-ip
@react-native-community/geolocation

Pings api endpoints via get/post requests for each of the folloing database tables:

  IP table: 
    
      https://vector-source-api.herokuapp.com/ips
      
  Locations table: 
  
      https://vector-source-api.herokuapp.com/locations
      
  Entries table: 
  
      https://vector-source-api.herokuapp.com/entries
      
      
      
 Thoughts on further development... 
 Could be configurable to a specific location, or community.
 Could be configurable to specific viral strains, which could be filtered in the UI. 
