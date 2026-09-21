// Attribution for the Snapshot photos, keyed by slug.
// Every photo is from Wikimedia Commons under CC0, public domain, CC BY or
// CC BY-SA, and CC BY / BY-SA require this credit to be shown.

export interface SnapshotCredit {
    author: string;
    license: string;
    sourceUrl: string;
}

export const SNAPSHOT_CREDITS: Record<string, SnapshotCredit> = {
    "mrt-train": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:3132-3131_SMRT_East-West_Line_10-11-2023.jpg",
    },
    "mrt-gantry": {
        author: "Terence Ong",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Thales_ticket_barriers,_Dhoby_Ghaut_MRT_Station,_Singapore_-_20051231.jpg",
    },
    "ez-link-card": {
        author: "AngMo",
        license: "Public domain",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ez-link_v.jpg",
    },
    "platform-screen-doors": {
        author: "RM Bulseco from Davao City, Philippines",
        license: "CC BY 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Platform_of_Promenade_MRT_Station,_Singapore_-_20140215.jpg",
    },
    "escalator": {
        author: "alex.ch",
        license: "CC BY 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Escalators_in_the_Concourse_of_the_National_Museum_of_Singapore_-_20070127-02.jpg",
    },
    "priority-seat": {
        author: "Mitchell Johnson",
        license: "Public domain",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Priority_Seat.jpg",
    },
    "bus-stop": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Concorde_Hotel_Singapore_bus_stop_11-11-2023(2).jpg",
    },
    "double-decker-bus": {
        author: "Timothy A. Gonsalves",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Double_Decker_SMRT_Bus_Singapore_Feb23_R16_06977.jpg",
    },
    "taxi": {
        author: "S5A-0043",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:SIN_ComfortDelgro_Taxi_SHC8080E_2023-11-03.jpg",
    },
    "bicycle": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Anywheel_bicycle_in_Singapore.jpg",
    },
    "ticket-machine": {
        author: "Terence Ong",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:General_ticketing_machines_at_Dhoby_Ghaut_MRT_Station,_Singapore_-_20051231.jpg",
    },
    "traffic-light": {
        author: "Jacklee",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_traffic_signal,_Stamford_Road,_Singapore_-_20111210-01.jpg",
    },
    "overhead-bridge": {
        author: "Daibo Taku",
        license: "CC BY 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Singapore_189969_-_panoramio_(3).jpg",
    },
    "mrt-map": {
        author: "User:Drat70, User:Aforl",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Singapore_MRT_LRT_system_map_Wikivoyage.png",
    },
    "zebra-crossing": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Mount_Faber_Loop_04-12-2024(11).jpg",
    },
    "cable-car": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Singapore_Cable_Car_No.27_(Mount_Faber_Line)_04-12-2024.jpg",
    },
    "mrt-station": {
        author: "S5A-0043",
        license: "CC BY 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:(SGP-Singapore)_Esplanade_MRT_Station_Exit_C_2026-04-03_-_2.jpg",
    },
    "bus-interchange": {
        author: "ZKang123",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Tampines_Bus_Interchange_buses_20200919_170446.jpg",
    },
    "lrt-train": {
        author: "S5A-0043",
        license: "CC BY 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:(SGP-Singapore)_Sengkang_LRT_Line_Mitsubishi_Heavy_Industries_Crystal_Mover_C810A_43_@_Fernvale_2025-02-02.jpg",
    },
    "card-reader": {
        author: "SBS6577P",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:EzLink_card_reader_on_SG6180L.jpg",
    },
    "taxi-stand": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Changi_Village_Road_taxi_stand_10-08-2025.jpg",
    },
    "ferry": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:I_MANTA_Singapore_Island_Cruise_Marina_South_Pier_to_Saint_John%27s_Island_and_Kusu_Island_17-05-2024.jpg",
    },
    "bus-lane": {
        author: "Daniel Case",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:View_south_down_Bukit_Timah_Road_from_Hinderhede_Road_pedestrian_overpass.jpg",
    },
    "hand-grips": {
        author: "Maksym Kozlenko",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:2016-04-03_Interior_of_MRT_Train_01.jpg",
    },
    "arrival-board": {
        author: "Joofer Jupiter",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Paya_Lebar_CCL_middle_platform_-_Train_to_Caldecott.jpg",
    },
    "monorail": {
        author: "Sharon Hahn Darlin",
        license: "CC BY 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Purple_Sentosa_Express_monorail,_Singapore_(cropped).jpg",
    },
    "lift": {
        author: "LN9267",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Holland_Village_Station_to_Exit_C_lift_13-05-2024.jpg",
    },
    "erp-gantry": {
        author: "Kalleboo (uploaded here by Mariordo)",
        license: "CC BY-SA 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Singapore%27s_ERP_gantry.jpg",
    },
    "motorcycle": {
        author: "Firzafp",
        license: "CC BY 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Yamaha_XSR155_parked_near_Masjid_Sultan_-_Singapore.jpg",
    },
    "lorry": {
        author: "Nicolas Lannuzel",
        license: "CC BY-SA 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_lorry_delivering_durians_in_Temple_Street,_Chinatown_(15229998761).jpg",
    },
    "carpark": {
        author: "ProjectManhattan.",
        license: "CC BY-SA 3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Urban_Redevelopment_Authority_car_park_in_a_Housing_and_Development_Board_estate,_Singapore_-_20140816.jpg",
    },
    "petrol-station": {
        author: "SBS6577P",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:SPC_Tampines_Ave_4,_November_2022.jpg",
    },
    "aeroplane": {
        author: "Bruce Cowan",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Singapore_Airlines_A350-941_(9V-SMI)_landing_at_Singapore_Changi_Airport.jpg",
    },
    "wheelchair": {
        author: "Stephen B Calvert (Clariosophic)",
        license: "CC BY-SA 4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Medline_F-1_manual_wheelchair_2.JPG",
    },
    "road-sign": {
        author: "Walter Lim",
        license: "CC BY 2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Directional_road_sign_along_Bukit_Timah_Road,_Singapore_-_20101128.jpg",
    },
};
