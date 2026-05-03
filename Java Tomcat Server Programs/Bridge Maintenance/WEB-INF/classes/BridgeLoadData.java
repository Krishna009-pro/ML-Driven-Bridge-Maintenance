public class BridgeLoadData{
    Long l;
    public BridgeLoadData(Long l){
        this.l = l;
    }
    public void add(Long add){
        l+= add;
    }
    public long getData(){
        return l;
        
    }
}