# Creating AltBeacon with Raspberry Pi using BlueZ

### Download BlueZ

  Download BlueZ source code (wget www.kernel.org/pub/linux/bluetooth/bluez-5.43.tar.xz)
  
  Extract the archive file (tar xvf bluez-5.43.tar.xz)
  
  Run the sample code and make sure that it works (./bluez-5.43/test/example-advertisement)
  
  Output should be like this
  
    $ ./bluez-5.43/test/example-advertisement
    GetAll
    returning props
    Advertisement registered
 
###  Modify BLE Advertisement Example Code

  Copy the example code (cp ./bluez-5.43/test/example-advertisement ./example-altbeacon)
  
  Open the file and look for TestAdvertisement class
  
  Replace ‘__init__’ method:
  
    def __init__(self, bus, index):
    
        Advertisement.__init__(self, bus, index, 'peripheral')
        self.add_service_uuid('180D')
        self.add_service_uuid('180F')
        self.add_manufacturer_data(0xffff, [0x00, 0x01, 0x02, 0x03, 0x04])
        self.add_service_data('9999', [0x00, 0x01, 0x02, 0x03, 0x04])
        self.include_tx_power = True
        
    with:
    
        def __init__(self, bus, index):
        company_id =  0x0118
        type =       [0xBE, 0xAC]
        id1 =        [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                      0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
        id2 =        [0x11, 0x22]
        id3 =        [0x33, 0x44]
        rssi_at_1m = [0xB3]
        feature  =   [0x00]
        Advertisement.__init__(self, bus, index, 'peripheral')
        self.add_manufacturer_data(company_id, type + id1 + id2 + id3 + rssi_at_1m + feature)
        
### Test
  
  Run the code
  
    ./example-altbeacon
    
  Output should be:
  
    GetAll
    returning props
    Advertisement registered
    
    
Reference [ https://scribles.net/creating-altbeacon-using-bluez-example-code-on-raspberry-pi/ ]
