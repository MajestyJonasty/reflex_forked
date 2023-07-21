﻿using Prism.Events;
using TrackingServer.Data;

namespace TrackingServer.Events;

public class ServerSettingsUpdatedEvent: PubSubEvent<TrackingServerAppSettings>
{
    
}